import { MonthData } from './types';

export const CALENDAR_DATA: MonthData[] = [
  {
    id: "jan",
    month: "January",
    season: "Winter",
    quarter: "Q1",
    activityLevel: 1,
    marketingBudgetPct: 12,
    bookingPriority: "Wedding Season Prep",
    keyEvents: ["New Year Events", "Engagement Season", "Award Galas"],
    targetAudience: ["Newly engaged", "Corporate planners", "Private hosts"],
    contentThemes: ["Book Your Wedding", "Winter Cocktails", "Indoor Events"],
    marketingActions: [
      "Launch wedding booking campaign",
      "Post winter cocktail recipes",
      "Email wedding planners",
      "Update portfolio photos",
      "Post Instagram engagement advice",
      "Create holiday party guides"
    ],
    socialPosts: [
      {
        platform: "Instagram",
        text: "💍 Just got engaged? Congrats! The best mobile bars book 12+ months out. DM us for your date! #WeddingPlanning #MobileBar"
      },
      {
        platform: "TikTok",
        text: "Just engaged? Book your mobile bar NOW. Top dates fill 12 months out. DM us! 💍🥂 #WeddingPlanning"
      },
      {
        platform: "LinkedIn",
        text: "Wedding season planning starts now. Let's partner on your big day. Limited 2025 dates available!"
      }
    ],
    emailSubject: "Wedding Planning Guide for Newly Engaged Couples",
    emailBody: "Hi [Name],\n\nCongrats on your engagement! As you plan your dream wedding, the bar is often the most visited spot by guests. Here is our guide to planning the perfect bar menu...",
    budgetBreakdown: { socialMediaAds: 40, emailCampaigns: 30, contentCreation: 20, partnershipsOutreach: 10 },
    criticalNotes: [
      "Not a peak event month but highest marketing month",
      "Wedding couples actively planning now",
      "Book events 4-9 months in advance"
    ],
    proTip: "Jan engagement posts peak Dec 25-Jan 5. Reply to ALL engagement announcements!"
  },
  {
    id: "feb",
    month: "February",
    season: "Winter",
    quarter: "Q1",
    activityLevel: 2,
    marketingBudgetPct: 8,
    bookingPriority: "Summer Weddings & Galas",
    keyEvents: ["Valentine's Day", "Super Bowl", "Wedding Showcases"],
    targetAudience: ["Couples", "Sports Fans", "Non-profits"],
    contentThemes: ["Romantic Cocktails", "Game Day Drinks", "Love Stories"],
    marketingActions: [
      "Run Valentine's Day couple special",
      "Partner with local florists for cross-promo",
      "Attend local wedding expos",
      "Update website SEO for 'Summer Weddings'",
      "Send newsletter to previous corporate clients"
    ],
    socialPosts: [
      {
        platform: "Instagram",
        text: "Love is in the air! 💕 Secure your date for your engagement party or wedding. #MobileBar #Valentines"
      },
      {
        platform: "TikTok",
        text: "Super Bowl party planning? Don't stress the drinks. We handle the bar, you handle the cheering. 🏈🍺"
      },
      {
        platform: "LinkedIn",
        text: "Planning a spring charity gala? Our professional bartenders elevate the donor experience."
      }
    ],
    emailSubject: "Love & Libations: Ideas for your next event",
    emailBody: "Hi [Name],\n\nWhether it's a romantic engagement party or a lively Super Bowl bash, the right drinks set the tone. Check out our 'Love Potion' cocktail recipe...",
    budgetBreakdown: { socialMediaAds: 30, emailCampaigns: 20, contentCreation: 30, partnershipsOutreach: 20 },
    criticalNotes: ["Don't ignore Galentine's Day - huge for private parties", "Follow up on all January expo leads"],
    proTip: "Create a 'His & Hers' signature cocktail menu example to show versatility."
  },
  {
    id: "mar",
    month: "March",
    season: "Spring",
    quarter: "Q1",
    activityLevel: 3,
    marketingBudgetPct: 10,
    bookingPriority: "Finalize Summer Dates",
    keyEvents: ["St. Patrick's Day", "March Madness", "Spring Equinox"],
    targetAudience: ["Corporate Teams", "College Events", "Irish Festivals"],
    contentThemes: ["Green Drinks", "Beer Selections", "Spring Refresh"],
    marketingActions: [
      "Promote St. Patrick's Day whiskey tasting",
      "Launch 'Spring Fling' cocktail menu",
      "Reach out to graduation party planners",
      "Audit inventory for busy season",
      "Train new seasonal staff"
    ],
    socialPosts: [
      {
        platform: "Instagram",
        text: "🍀 Luck of the Irish! Book us for your St. Paddy's bash. Whiskey flights available! #StPatricksDay"
      },
      {
        platform: "TikTok",
        text: "March Madness is here! 🏀 Who's in your final four? We're serving up victory drinks all month."
      },
      {
        platform: "LinkedIn",
        text: "Q1 is wrapping up. Celebrate your team's wins with a happy hour hosted by us."
      }
    ],
    emailSubject: "Spring is Coming! Is your event calendar ready?",
    emailBody: "Hi [Name],\n\nThe days are getting longer and the events are getting bigger. As we head into spring, dates are vanishing fast...",
    budgetBreakdown: { socialMediaAds: 30, emailCampaigns: 20, contentCreation: 20, partnershipsOutreach: 30 },
    criticalNotes: ["CRITICAL: Final push for filling June/July calendar gaps", "Weather is unpredictable; emphasize indoor/outdoor flexibility"],
    proTip: "Offer a 'March Madness' discount for corporate happy hours booked on weekdays.",
    isCritical: true
  },
  {
    id: "apr",
    month: "April",
    season: "Spring",
    quarter: "Q2",
    activityLevel: 3,
    marketingBudgetPct: 8,
    bookingPriority: "Graduations & Showers",
    keyEvents: ["Tax Day", "Bridal Showers", "Earth Day"],
    targetAudience: ["Mothers of Grads", "Maids of Honor", "Eco-conscious brands"],
    contentThemes: ["Floral Cocktails", "Sustainable Sips", "Brunch Bars"],
    marketingActions: [
      "Campaign for Bridal Shower Mimosas",
      "Promote 'Eco-Friendly' bar options for Earth Day",
      "Contact Universities for grad events",
      "Shoot content with spring flowers",
      "Post 'Tax Day Relief' drink specials"
    ],
    socialPosts: [
      {
        platform: "Instagram",
        text: "Showers bring flowers... and Mimosas! 🥂 Perfect for bridal & baby showers. #BrunchBar"
      },
      {
        platform: "TikTok",
        text: "Tax Day is over! 😅 You deserve a drink. Book a private happy hour for your accounting team!"
      },
      {
        platform: "LinkedIn",
        text: "Sustainability in events is key. Ask about our zero-waste cocktail program for your next corporate gathering."
      }
    ],
    emailSubject: "Celebrate the Grads & Brides!",
    emailBody: "Hi [Name],\n\nTis the season for showers and caps & gowns. Let us handle the refreshments so you can focus on the guest of honor...",
    budgetBreakdown: { socialMediaAds: 35, emailCampaigns: 25, contentCreation: 30, partnershipsOutreach: 10 },
    criticalNotes: ["Start prepping logistics for May rush", "Ensure all permits for summer festivals are submitted"],
    proTip: "Mimosa bars are high margin and low effort. Push them for Sunday daytime events."
  },
  {
    id: "may",
    month: "May",
    season: "Spring",
    quarter: "Q2",
    activityLevel: 4,
    marketingBudgetPct: 8,
    bookingPriority: "Summer Corporate Events",
    keyEvents: ["Cinco de Mayo", "Memorial Day", "Mother's Day"],
    targetAudience: ["Families", "Outdoor Festivals", "Corporate Picnics"],
    contentThemes: ["Margaritas", "Tequila Tasting", "Mom's Favorites"],
    marketingActions: [
      "Heavy promotion for Cinco de Mayo",
      "Mother's Day 'Mom-osa' specials",
      "Memorial Day BBQ packages",
      "Confirm all June wedding logistics",
      "Tease summer cocktail menu"
    ],
    socialPosts: [
      {
        platform: "Instagram",
        text: "Tacos need Tequila. 🌮🍹 We bring the top-shelf Margs to your fiesta! #CincoDeMayo"
      },
      {
        platform: "TikTok",
        text: "Don't make Mom pour her own drinks. Treat her to a private bartender this Mother's Day! 💐"
      },
      {
        platform: "LinkedIn",
        text: "Summer Fridays are coming. Book your recurring office happy hours now."
      }
    ],
    emailSubject: "Kickoff Summer with Style",
    emailBody: "Hi [Name],\n\nFrom Margaritas to Mimosas, May is a flavor explosion. We are gearing up for our busiest season...",
    budgetBreakdown: { socialMediaAds: 40, emailCampaigns: 20, contentCreation: 30, partnershipsOutreach: 10 },
    criticalNotes: ["Staffing check: ensure you have coverage for Memorial Day weekend", "Inventory stock up for peak season"],
    proTip: "Partner with a local taco truck for a 'Tacos & Tequila' package deal."
  },
  {
    id: "jun",
    month: "June",
    season: "Summer",
    quarter: "Q2",
    activityLevel: 5,
    marketingBudgetPct: 6,
    bookingPriority: "Fall Weddings",
    keyEvents: ["Peak Weddings", "Pride Month", "Father's Day"],
    targetAudience: ["Wedding Planners", "LGBTQ+ Community", "Dads"],
    contentThemes: ["Wedding Realness", "Rainbow Drinks", "Whiskey & Bourbon"],
    marketingActions: [
      "Capture high-quality video at weddings",
      "Create 'Pride' signature cocktail menu",
      "Run 'Bourbon for Dad' promo",
      "Ask for reviews from May clients",
      "Post 'Behind the Scenes' of busy weekends"
    ],
    socialPosts: [
      {
        platform: "Instagram",
        text: "Love wins! 🏳️‍🌈 Celebrating Pride with our colorful cocktail lineup. #PrideMonth #LoveIsLove"
      },
      {
        platform: "TikTok",
        text: "It's officially Wedding Season! 💍 Spots for Fall 2024 are 90% full. Don't wait!"
      },
      {
        platform: "LinkedIn",
        text: "Mid-year review time? Soften the blow with a premium coffee & mocktail bar for the team."
      }
    ],
    emailSubject: "Cheers to Love & Summer Nights",
    emailBody: "Hi [Name],\n\nJune is here and the calendar is packed! If you are eyeing a date in September/October, please reach out now...",
    budgetBreakdown: { socialMediaAds: 20, emailCampaigns: 20, contentCreation: 50, partnershipsOutreach: 10 },
    criticalNotes: ["Execution mode: Marketing slows, operations speed up", "Collect user-generated content (UGC) from guests"],
    proTip: "Use Pride events to showcase your ability to create custom, themed menus."
  },
  {
    id: "jul",
    month: "July",
    season: "Summer",
    quarter: "Q3",
    activityLevel: 4,
    marketingBudgetPct: 5,
    bookingPriority: "Holiday Parties (Early Bird)",
    keyEvents: ["4th of July", "Summer Festivals", "Corporate Picnics"],
    targetAudience: ["Event Planners", "Neighborhood HOAs", "Pool Party Hosts"],
    contentThemes: ["Red White & Blue", "Frozen Drinks", "Hydration Stations"],
    marketingActions: [
      "4th of July 'Sparkler' cocktails",
      "Launch 'Christmas in July' promo for Holiday bookings",
      "Focus on hydration/mocktails for hot days",
      "Update website with mid-year photos",
      "Network with tent/rental companies"
    ],
    socialPosts: [
      {
        platform: "Instagram",
        text: "Beat the heat! ☀️ Our frozen margarita machine is ready for your pool party. 🧊🍹 #SummerVibes"
      },
      {
        platform: "TikTok",
        text: "Too early for Christmas talk? NOPE. Book your Holiday Party now for 10% off. 🎄🎅 #XmasInJuly"
      },
      {
        platform: "LinkedIn",
        text: "Planning the company summer picnic? We provide full insured bar services for outdoor venues."
      }
    ],
    emailSubject: "Christmas in July? (Yes, really)",
    emailBody: "Hi [Name],\n\nSmart planners book their December holiday parties in July. Why? Because you get the best dates...",
    budgetBreakdown: { socialMediaAds: 30, emailCampaigns: 40, contentCreation: 20, partnershipsOutreach: 10 },
    criticalNotes: ["Heat management: Ensure staff and ice supply can handle high temps", "Start planting seeds for Q4 corporate events"],
    proTip: "Frozen drink rentals are a goldmine in July. Upsell the machine even without full service."
  },
  {
    id: "aug",
    month: "August",
    season: "Summer",
    quarter: "Q3",
    activityLevel: 4,
    marketingBudgetPct: 8,
    bookingPriority: "Holiday Parties (CRITICAL)",
    keyEvents: ["End of Summer", "Back to School", "Labor Day Prep"],
    targetAudience: ["Teachers/PTA", "Corporate HR", "Labor Day Hosts"],
    contentThemes: ["Last Sips of Summer", "Back to School (for parents)", "Beer & BBQ"],
    marketingActions: [
      "Major push for Holiday Corporate Bookings",
      "Labor Day weekend booking blitz",
      "'Wine Down' events for parents",
      "Audit Q4 inventory needs",
      "Review YTD financials and adjust Q4 budget"
    ],
    socialPosts: [
      {
        platform: "Instagram",
        text: "Squeezing the last drop out of summer! 🍋 Book us for Labor Day weekend before it's gone."
      },
      {
        platform: "TikTok",
        text: "HR Managers: The best holiday party dates are going fast. Don't be stuck with a Tuesday in Jan. 📅"
      },
      {
        platform: "LinkedIn",
        text: "Secure your Corporate Holiday Party bar service by Aug 31st for complimentary champagne toast upgrades."
      }
    ],
    emailSubject: "The Holiday Rush starts... NOW",
    emailBody: "Hi [Name],\n\nI know it's hot outside, but the holidays are around the corner. Our December calendar is 40% full...",
    budgetBreakdown: { socialMediaAds: 40, emailCampaigns: 40, contentCreation: 10, partnershipsOutreach: 10 },
    criticalNotes: ["CRITICAL: This is the month to lock in big corporate holiday budgets", "Staff burnout watch: rotate schedules"],
    proTip: "Target Teachers/Schools for 'Back to School' happy hours in late August.",
    isCritical: true
  },
  {
    id: "sep",
    month: "September",
    season: "Fall",
    quarter: "Q3",
    activityLevel: 5,
    marketingBudgetPct: 10,
    bookingPriority: "Next Year Weddings",
    keyEvents: ["Labor Day", "Oktoberfest", "Fall Wedding Peak"],
    targetAudience: ["Beer Lovers", "Fall Brides", "Football Tailgates"],
    contentThemes: ["Pumpkin Spice", "Oktoberfest Beers", "Cider Cocktails"],
    marketingActions: [
      "Launch Fall Cocktail Menu",
      "Oktoberfest beer packages",
      "Tailgate packages for football season",
      "Attend Fall bridal shows",
      "Finalize all October Halloween details"
    ],
    socialPosts: [
      {
        platform: "Instagram",
        text: "Sweater weather & Cider. 🍂 Our Fall menu brings the cozy vibes to your wedding. #FallWedding"
      },
      {
        platform: "TikTok",
        text: "Prost! 🍻 Oktoberfest packages available now. We bring the steins, you bring the bratwurst."
      },
      {
        platform: "LinkedIn",
        text: "Kickoff the fiscal year with a team networking event. Football on the screen, drinks in hand."
      }
    ],
    emailSubject: "Fall flavors have arrived 🍁",
    emailBody: "Hi [Name],\n\nCrisp air means dark spirits and warm spices. Check out our new 'Smoked Maple Old Fashioned'...",
    budgetBreakdown: { socialMediaAds: 30, emailCampaigns: 20, contentCreation: 40, partnershipsOutreach: 10 },
    criticalNotes: ["CRITICAL: Second peak wedding season", "Weather transition: Ensure heaters/tents are ready"],
    proTip: "Tailgating packages (Bloody Mary bars) are great for Sunday mornings.",
    isCritical: true
  },
  {
    id: "oct",
    month: "October",
    season: "Fall",
    quarter: "Q4",
    activityLevel: 4,
    marketingBudgetPct: 10,
    bookingPriority: "Final Holiday Push",
    keyEvents: ["Halloween", "Sweetest Day", "Breast Cancer Awareness"],
    targetAudience: ["Costume Parties", "Charity Galas", "Fall Festivals"],
    contentThemes: ["Spooky Sips", "Pink Drinks", "Harvest Themes"],
    marketingActions: [
      "Halloween 'Spooky' cocktail/mocktail specials",
      "Pink drink menu for charity events",
      "Last call for Holiday Party bookings",
      "Flash sale for remaining Nov/Dec dates",
      "Order holiday decorations for the bar"
    ],
    socialPosts: [
      {
        platform: "Instagram",
        text: "Pick your poison. 🧪👻 Our Halloween cocktails are to die for. Book your spooky bash! #HalloweenParty"
      },
      {
        platform: "TikTok",
        text: "Still haven't booked a bar for the office Xmas party? We have 3 dates left. DM us! 🎄🚨"
      },
      {
        platform: "LinkedIn",
        text: "Supporting Breast Cancer Awareness month with our 'Pink Ribbon' charity cocktail menu."
      }
    ],
    emailSubject: "Spooky Sips & Holiday Tips",
    emailBody: "Hi [Name],\n\nWhether you are hosting a monster mash or a black-tie gala, we have the menu to match...",
    budgetBreakdown: { socialMediaAds: 40, emailCampaigns: 30, contentCreation: 20, partnershipsOutreach: 10 },
    criticalNotes: ["CRITICAL: Close out the year's bookings. Do not leave dates on the table.", "Halloween falls on a weekday? Push weekend parties."],
    proTip: "Dry ice is cheap and creates an incredible visual effect for Halloween marketing photos.",
    isCritical: true
  },
  {
    id: "nov",
    month: "November",
    season: "Fall",
    quarter: "Q4",
    activityLevel: 3,
    marketingBudgetPct: 5,
    bookingPriority: "Next Year Q1 & Q2",
    keyEvents: ["Thanksgiving", "Black Friday/Cyber Monday", "Beaujolais Nouveau"],
    targetAudience: ["Friendsgiving Hosts", "Shoppers", "Wine Lovers"],
    contentThemes: ["Gratitude", "Wine Pairings", "Gift Cards"],
    marketingActions: [
      "Promote 'Friendsgiving' batched cocktails",
      "Black Friday deal: % off next year bookings",
      "Sell Mobile Bar Gift Cards",
      "Send 'Thank You' cards to this year's top vendors",
      "Prep staff for December madness"
    ],
    socialPosts: [
      {
        platform: "Instagram",
        text: "Grateful for great drinks. 🦃🍷 Let us handle the wine service for your Thanksgiving dinner."
      },
      {
        platform: "TikTok",
        text: "Black Friday Deal! ⚫ Book your 2025 event this week and get a free champagne toast upgrade!"
      },
      {
        platform: "LinkedIn",
        text: "Reflecting on a year of growth. Thank you to our corporate partners for a fantastic season."
      }
    ],
    emailSubject: "Our Black Friday Deal for 2025 Events",
    emailBody: "Hi [Name],\n\nGobble gobble! As we give thanks, we want to give you a deal. Book 2025 before Dec 1st...",
    budgetBreakdown: { socialMediaAds: 50, emailCampaigns: 30, contentCreation: 10, partnershipsOutreach: 10 },
    criticalNotes: ["Operations: Deep clean equipment before December rush", "Sales: Lock in deposits for Q1 next year"],
    proTip: "Black Friday isn't just for retail. Offer a 'booking bonus' to fill Q1 dates."
  },
  {
    id: "dec",
    month: "December",
    season: "Winter",
    quarter: "Q4",
    activityLevel: 5,
    marketingBudgetPct: 8,
    bookingPriority: "Engagement Season (Next Year)",
    keyEvents: ["Holiday Parties", "New Year's Eve", "Proposal Peak"],
    targetAudience: ["Companies", "NYE Hosts", "Soon-to-be Engaged"],
    contentThemes: ["Champagne", "Year in Review", "Festive Cheer"],
    marketingActions: [
      "Execute Holiday Parties flawlessly",
      "NYE Champagne Tower promotions",
      "Launch 'Just Engaged' campaign Dec 26th",
      "Take photos of winter setups",
      "Schedule staff appreciation party"
    ],
    socialPosts: [
      {
        platform: "Instagram",
        text: "Pop the bubbly! 🍾 Cheers to a fabulous year. Ring in the New Year with our champagne towers! #NYE"
      },
      {
        platform: "TikTok",
        text: "To all the bartenders working double shifts this month: We see you. You're the real MVPs. 🫡🍻"
      },
      {
        platform: "LinkedIn",
        text: "Booking for 2025? Corporate calendars are filling up. Secure your quarterly happy hours now."
      }
    ],
    emailSubject: "Cheers to you! (And a sneak peek at 2025)",
    emailBody: "Hi [Name],\n\nWhat a year! Thank you for celebrating with us. As we close out the year...",
    budgetBreakdown: { socialMediaAds: 40, emailCampaigns: 20, contentCreation: 30, partnershipsOutreach: 10 },
    criticalNotes: ["Peak Execution: Survival mode.", "Proposal Season begins Dec 24th - Have auto-responders ready!"],
    proTip: "The week between Christmas and NYE is the highest engagement time on social media. Have posts scheduled!",
  }
];