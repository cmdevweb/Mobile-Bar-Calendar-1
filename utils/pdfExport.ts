import jsPDF from 'jspdf';
import { MonthData } from '../types';

export const exportMonthToPDF = (
  month: MonthData,
  region: string,
  checklistProgress: boolean[],
  trackerResults?: any
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 15;
  const lineHeight = 7;
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  // Helper function for text wrapping
  const addWrappedText = (text: string, fontSize: number = 10, isBold: boolean = false) => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    
    const lines = doc.splitTextToSize(text, contentWidth);
    lines.forEach((line: string) => {
      if (yPosition > pageHeight - 15) {
        doc.addPage();
        yPosition = 15;
      }
      doc.text(line, margin, yPosition);
      yPosition += lineHeight;
    });
    
    doc.setFont('helvetica', 'normal');
  };

  // Header
  doc.setFont('helvetica', 'bold');
  addWrappedText(`${month.month} Marketing Plan`, 16, true);
  
  yPosition += 2;
  doc.setFontSize(9);
  doc.setTextColor(100);
  doc.text(`Region: ${region} | Generated: ${new Date().toLocaleDateString()}`, margin, yPosition);
  doc.setTextColor(0);
  yPosition += 12;

  // Status
  addWrappedText(`Status: ${month.bookingPriority}`, 11, true);
  yPosition += 5;

  // Activity Level
  addWrappedText(`Activity Level: ${month.activityLevel}/5 | Budget: ${month.marketingBudgetPct}%`, 10);
  yPosition += 8;

  // Key Events
  addWrappedText('KEY EVENTS & HOLIDAYS', 11, true);
  month.keyEvents.forEach(event => {
    doc.setFontSize(9);
    doc.text(`• ${event}`, margin + 5, yPosition);
    yPosition += lineHeight;
  });
  yPosition += 5;

  // Target Audience
  addWrappedText('TARGET AUDIENCE', 11, true);
  month.targetAudience.forEach(audience => {
    doc.setFontSize(9);
    doc.text(`• ${audience}`, margin + 5, yPosition);
    yPosition += lineHeight;
  });
  yPosition += 5;

  // Action Checklist
  addWrappedText('ACTION CHECKLIST', 11, true);
  const completedCount = checklistProgress.filter(Boolean).length;
  const totalCount = checklistProgress.length;
  doc.setFontSize(9);
  doc.text(`Progress: ${completedCount}/${totalCount} completed`, margin, yPosition);
  yPosition += lineHeight + 2;

  month.marketingActions.forEach((action, index) => {
    const isChecked = checklistProgress[index];
    const checkmark = isChecked ? '[x]' : '[ ]';
    doc.setFontSize(9);
    doc.text(`${checkmark} ${action}`, margin + 5, yPosition);
    yPosition += lineHeight;
  });
  yPosition += 5;

  // Social Posts
  addWrappedText('SOCIAL POSTS (Ready to Copy)', 11, true);
  month.socialPosts.forEach(post => {
    if (yPosition > pageHeight - 20) {
      doc.addPage();
      yPosition = 15;
    }
    addWrappedText(`${post.platform}:`, 10, true);
    doc.setFontSize(8);
    const postLines = doc.splitTextToSize(`"${post.text}"`, contentWidth - 5);
    postLines.forEach((line: string) => {
      if (yPosition > pageHeight - 15) {
        doc.addPage();
        yPosition = 15;
      }
      doc.text(line, margin + 5, yPosition);
      yPosition += lineHeight - 1;
    });
    yPosition += 3;
  });
  yPosition += 5;

  // Email Template
  addWrappedText('EMAIL TEMPLATE', 11, true);
  addWrappedText(`Subject: ${month.emailSubject}`, 9, true);
  yPosition += 2;
  addWrappedText(month.emailBody, 8);
  yPosition += 5;

  // Revenue Tracker Results (if available)
  if (trackerResults?.totalBookings) {
    addWrappedText('REVENUE BY LEAD SOURCE', 11, true);
    doc.setFontSize(9);
    doc.text(`Total Bookings: ${trackerResults.totalBookings}`, margin, yPosition);
    yPosition += lineHeight;
    doc.text(`Total Revenue: $${trackerResults.totalRevenue.toLocaleString()}`, margin, yPosition);
    yPosition += lineHeight;
    if (trackerResults.topChannel) {
      doc.text(`Top Channel: ${trackerResults.topChannel.name} (${Math.round(trackerResults.topChannel.percentage)}%)`, margin, yPosition);
      yPosition += lineHeight + 5;
    }
  }

  // Budget Breakdown
  addWrappedText('BUDGET ALLOCATION', 11, true);
  Object.entries(month.budgetBreakdown).forEach(([key, percent]) => {
    const label = key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
    doc.setFontSize(9);
    doc.text(`${label}: ${percent}%`, margin, yPosition);
    yPosition += lineHeight;
  });
  yPosition += 5;

  // Critical Notes & Pro Tip
  addWrappedText('CRITICAL NOTES', 11, true);
  month.criticalNotes.forEach(note => {
    doc.setFontSize(8);
    const noteLines = doc.splitTextToSize(note, contentWidth - 5);
    noteLines.forEach((line: string) => {
      if (yPosition > pageHeight - 15) {
        doc.addPage();
        yPosition = 15;
      }
      doc.text(line, margin + 5, yPosition);
      yPosition += lineHeight - 1;
    });
    yPosition += 2;
  });

  // Footer
  yPosition = pageHeight - 15;
  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text('Generated via Mobile Bar Marketing Calendar', margin, yPosition);
  doc.text(new Date().toLocaleString(), pageWidth - margin - 40, yPosition);

  // Save
  const filename = `${month.month.replace(/\s+/g, '-')}-${region.replace(/\s+/g, '-')}-Marketing-Plan-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
};