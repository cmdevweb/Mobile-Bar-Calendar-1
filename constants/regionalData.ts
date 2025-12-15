import { RegionalCalendarData, Region, MonthData } from '../types';
import { CALENDAR_DATA as BASE_DATA } from '../constants';

// Helper to create regional data by overriding the base data
const createRegion = (region: Region, regionName: string, overrides: Partial<MonthData>[]): RegionalCalendarData => {
  const months = BASE_DATA.map((baseMonth, index) => {
    const override = overrides[index] || {};
    return { ...baseMonth, ...override };
  });
  return { region, regionName, months };
};

// --- MIDWEST ---
export const MIDWEST_DATA = createRegion('midwest', 'Midwest', [
  { // Jan
    activityLevel: 2,
    marketingBudgetPct: 14,
    bookingPriority: 'Winter Wedding Planning & Corporate Events',
    keyEvents: ['New Year Events', 'Engagement Season', 'MLK Day'],
    targetAudience: ['Newly engaged couples', 'Corporate planners', 'Private parties'],
    contentThemes: ['Book Your Winter Wedding', 'Cozy Indoor Events', 'New Year Celebrations'],
    marketingActions: [
      'Launch wedding booking campaign for spring/summer',
      'Email corporate event planners (Q1 budgets)',
      'Post winter cocktail recipes (3x)',
      'Update portfolio with holiday photos',
      'Create new year resolution content'
    ],
    socialPosts: [
      { platform: 'Instagram', text: '💍 Just got engaged? Congrats! The best mobile bars in the Midwest book 8-12 months out. Let\'s make your big day amazing! DM for 2025 dates. #WeddingPlanning #MobileBar' },
      { platform: 'TikTok', text: 'Midwest wedding planning starts NOW. Book your mobile bar before spring dates fill up! 💍 DM us!' },
      { platform: 'LinkedIn', text: 'Corporate teams: Start 2025 right with a premium happy hour. We handle the drinks, you focus on team building.' }
    ],
    emailSubject: 'Plan Your Dream Midwest Wedding in 2025',
    criticalNotes: ['Winter is cold but weddings are HOT. Couples planning spring/summer now.', 'Corporate Q1 budgets are unlocking', 'Indoor heated setups are premium service'],
    proTip: 'January engagement posts on Instagram peak Dec 25-Jan 5. Reply to EVERY engagement post during that window for 8x higher conversion.',
  }
]);

// --- SOUTHWEST ---
export const SOUTHWEST_DATA = createRegion('southwest', 'Southwest', [
  { // Jan
    activityLevel: 3,
    marketingBudgetPct: 12,
    bookingPriority: 'Spring Wedding & Desert Event Season',
    keyEvents: ['New Year Events', 'Desert Bloom', 'Engagement Season'],
    targetAudience: ['Outdoor wedding couples', 'Resort planners', 'Desert event hosts'],
    contentThemes: ['Desert Wedding Dreams', 'Sunset Celebrations', 'Outdoor Cocktails'],
    marketingActions: ['Promote outdoor wedding packages', 'Email resort/venue partners', 'Create desert sunset content', 'Post engagement season tips', 'Highlight outdoor heating solutions'],
    socialPosts: [
      { platform: 'Instagram', text: '🌵 Just engaged? Southwest sunsets + mobile bars = MAGIC. Book now for spring 2025! Limited dates available. #SouthwestWedding #DesertMagic' },
      { platform: 'TikTok', text: 'Southwest weddings are STUNNING. We bring the bar to your perfect desert location. Book early! 🌅' },
      { platform: 'LinkedIn', text: 'Resort owners & event planners: Premium bar service elevates guest experience. Available for corporate retreats year-round.' }
    ],
    emailSubject: 'Your Southwest Wedding Deserves a Stunning Mobile Bar',
    criticalNotes: ['Spring season (Mar-May) is peak wedding time', 'Desert heat requires special equipment', 'Resort partnerships are high-value'],
    proTip: 'Partner with desert resorts and venue. They have 50+ events/year and refer frequently.',
  }
]);

// --- SOUTH ---
export const SOUTH_DATA = createRegion('south', 'South', [
  { // Jan
    activityLevel: 3,
    marketingBudgetPct: 12,
    bookingPriority: 'Mild Weather Wedding Season Starts',
    keyEvents: ['New Year Events', 'Mild Weather', 'Engagement Announcements'],
    targetAudience: ['Destination wedding couples', 'Resort planners', 'Private party hosts'],
    contentThemes: ['Southern Charm Weddings', 'Outdoor Events', 'Warm Weather Celebrations'],
    marketingActions: ['Launch destination wedding campaign', 'Email Southern venues & resorts', 'Create outdoor event content', 'Highlight mild weather advantage', 'Post engagement season content'],
    socialPosts: [
      { platform: 'Instagram', text: 'Just engaged? Southern weddings are MAGICAL. Mild January-March weather is PERFECT. Book your mobile bar now! #SouthernWedding #DestinationBride' },
      { platform: 'TikTok', text: 'Why Southern weddings are the MOVE: Mild weather, gorgeous backdrops, and amazing hospitality. + Our mobile bar. 🥂' },
      { platform: 'LinkedIn', text: 'Event planners: Southern venues need premium bar service. We specialize in outdoor & indoor setups that wow guests.' }
    ],
    emailSubject: 'Plan Your Southern Dream Wedding in 2025',
    criticalNotes: ['Southern weddings peak Jan-April', 'Destination wedding market is strong', 'Outdoor setups most popular'],
    proTip: 'Contact Airbnb hosts with large properties. They throw events frequently and refer often.',
  }
]);

// --- OTHER REGIONS (Using Base Data for now but structured) ---
export const NORTHEAST_DATA = createRegion('northeast', 'Northeast', []);
export const PACIFIC_NW_DATA = createRegion('pacific-nw', 'Pacific Northwest', []);
export const CALIFORNIA_DATA = createRegion('california', 'California', []);
export const COLORADO_DATA = createRegion('colorado', 'Colorado', []);

export const CALENDAR_DATA_BY_REGION: Record<Region, RegionalCalendarData> = {
  'midwest': MIDWEST_DATA,
  'southwest': SOUTHWEST_DATA,
  'south': SOUTH_DATA,
  'northeast': NORTHEAST_DATA,
  'pacific-nw': PACIFIC_NW_DATA,
  'california': CALIFORNIA_DATA,
  'colorado': COLORADO_DATA,
};