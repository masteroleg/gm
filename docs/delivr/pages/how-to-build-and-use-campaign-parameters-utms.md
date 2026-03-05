---
slug: "how-to-build-and-use-campaign-parameters-utms"
category: "Delivr"
tags:
  - delivr
title: "How to build and use campaign parameters (UTMs)."
url: "https://delivr.com/faq/1577/how-to-build-and-use-campaign-parameters-utms"
source: "Documents index"
date: 2026-03-04
description: "Markdown export from documents.index.json"
author: "Delivr"
last_updated: "2026-03-04"
language: "en"
topics: []
reading_time: "1 min"
origin_doc_path: "docs/delivr/pages/how-to-build-and-use-campaign-parameters-utms.md"
------

# How to build and use campaign parameters (UTMs).

URL: https://delivr.com/faq/1577/how-to-build-and-use-campaign-parameters-utms

Title: How to build and use campaign parameters (UTMs).

URL Source: http://delivr.com/faq/1577/how-to-build-and-use-campaign-parameters-utms

Markdown Content:
Campaign parameters — also called URL or UTM parameters — are tags added to URLs that help track where visitors come from, how they engage, and which actions they take. When paired with analytics tools like Google Analytics — and used alongside QR codes — they make it possible to measure both online and offline campaign performance, understand audience behavior, optimize marketing strategies, and attribute conversions with accuracy. Delivr’s UTM Builder simplifies the process by helping you add essential parameters, while best practices such as testing links, using consistent naming conventions, and shortening URLs ensure clean, reliable tracking and meaningful insights.(Note: application URLs are not supported.)
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Purpose of Campaign Parameters

Campaign parameters show which channels, campaigns, and specific pieces of content drive the most traffic, engagement, and conversions.

Why Combine QR Codes and UTM Parameters?

*   **Track effectiveness.** See which physical materials or locations drive traffic.
*   **Understand behavior.** Follow the user journey from the scan to conversions.
*   **Optimize campaigns.** Compare QR codes in different ads or locations to see which performs best.
*   **Avoid guesswork.** Instead of assuming which channel brought traffic, you get precise data.

Campaign Parameters

The following parameters can be added to your Destination URL. It is recommended to always include **Campaign Source**, **Campaign Medium**, and **Campaign Name** when setting up parameters.

**Best practices:**
-------------------

*   Use lowercase letters.
*   Separate words with underscores (_) or hyphens (-); avoid spaces.
*   **Do not** include any personally identifiable information (PII) in UTMs, as Google Analytics prohibits it.

**Campaign Source**(Required)
-----------------------------

**`utm_source`**

Identify the source that is sending traffic, e.g., _flyer_, _label, packaging, pos_, _email\_newsletter_, _instagram_.

**Campaign Medium**(Recommended)
--------------------------------

**`utm_medium`**

Identify the marketing channel type, e.g., _qrcode_

**Campaign Name**(Recommended)
------------------------------

**`utm_campaign`**

Identify the name of the campaign, product, promo code, or slogan.

**Campaign Term**(Optional)
---------------------------

**`utm_term`**

Identify paid search keywords. Enter **{trace}** to automatically insert your serialized Trace ID.

**Campaign Content**(Optional)
------------------------------

**`utm_content`**

Differentiate ads, similar content, or SKUs. Need the country of the visitor sent as a dynamic parameter? Enter `{country}` anywhere in the string and we'll remove it and append `_country_<2-character country code>`at the end of your Campaign Content. For example,

*   If you enter `{country}`, the value of `utm_content`for a visitor from the United States will be `_country_US`
*   If you enter `sku_12345{country}`, the value of `utm_content`for a visitor from the United States will be `sku_12345_country_US`

**Campaign ID**(Optional)
-------------------------

**`utm_id`**

Identify a specific campaign or promotion.

**Campaign Platform**(Optional)
-------------------------------

**`utm_source_platform`**

Differentiate your media buying platform or ad network.

`utm_creative_format`and `utm_marketing_tactic`are not included in standard Google Analytics 4 reports. To track them, you must create custom dimensions in GA4 that capture their values.

**Campaign Creative Format**(Optional)
--------------------------------------

**`utm_creative_format`**

Identify the type of creative. _ut_ m_creative_format is not currently reported in Google Analytics 4 properties.

**Campaign Marketing Tactic**(Optional)
---------------------------------------

**`utm_marketing_tactic`**

Identify the targeting criteria applied to a campaign. _utm\_marketing\_tactic is not currently reported in Google Analytics 4 properties._

**Implementation**
------------------

Delivr adds the parameters to the end of your Destination URL as query strings on redirection:

`https://delivr.com/123abc?utm_source=packaging&utm_medium=qrcode&utm_campaign=new_program`

Steps to Add Campaign Parameters (Delivr’s UTM Builder)

Use this feature to add Campaign (UTM) Parameters to your links.

1.   **Locate Your Campaign**

 From your Dashboard, find the campaign you want to add parameters to.
2.   **Open the Campaign Parameters for the Campaign**

 In the campaign’s row, click **Configure Campaign Parameters**. Alternatively, click the Edit Campaign icon (pencil), then select the Campaign Parameters tab.
3.   **Enable Parameters**

 For the question _“Append Campaign Parameters to Destination URL?”_, select **Yes**.
4.   **Enter Your Parameters**

 Add the desired campaign parameters in the provided fields.
5.   **Save Your Changes**

 When finished, click **Save** or **Save & Close** at the bottom of the page.

Benefits of Using UTM Parameters

Track scans to conversions, measure performance, and attribute results accurately.

*   **Track the full customer journey.** Follow visitors from the moment they scan your QR code to the actions they take on your website.
*   **Measure performance.** Identify which campaigns, channels, and links drive the most traffic and conversions.
*   **Understand audiences.** Discover where your visitors come from, what content they engage with, and which offers appeal most.
*   **Optimize campaigns.** Double down on the strategies that perform best and adjust or retire underperforming ones.
*   **Ensure accurate attribution.** Confidently assign conversions and sales to the right source, medium, and campaign.

UTM Best Practices & Optimization Tips

UTM parameters are powerful tools for tracking your campaigns, but following best practices ensures your data is accurate, actionable, and easy to analyze. Use these tips to get the most out of your tracking:

**1. Test Your Links and QR Codes**

*   After adding UTM parameters, test every link and QR code before publishing.
*   Verify that the URL redirects correctly and that analytics platforms (like Google Analytics) register all parameters.
*   Test across multiple devices and browsers to ensure compatibility.
*   For dynamic parameters (e.g., {trace} or {country}), confirm placeholders populate correctly in live URLs.

**2. Maintain Naming Consistency**

*   Use **lowercase letters** for all UTM values to avoid duplicate entries (e.g., email_newsletter vs. Email_Newsletter).
*   Pick either **hyphens (-)** or **underscores (_)** to separate words, and stick with it across campaigns.
*   Develop standardized conventions for campaign names, sources, mediums, and content, e.g.: 
    *   `utm_source=packaging`
    *   `utm_medium=qrcode`
    *   `utm_campaign=new_program`

*   Consistency makes reporting cleaner, filtering easier, and comparisons more accurate.

**3. Use Dynamic Parameters Where Possible**

*   Leverage placeholders like {country}, {trace}, or {campaign_id} to automatically capture data relevant to each user or campaign.
*   This reduces manual errors and provides richer analytics insights.

**4. Shorten or Mask URLs**

*   Long URLs with multiple UTM parameters can appear messy and may reduce QR code readability. Delivr automatically hides these parameters behind your managed short URL, creating a cleaner link and more scannable QR code.

**5. Segment and Tag Campaigns Strategically**

*   Use `utm_content`or `utm_term` to differentiate between multiple creatives, placements, or offers within a single campaign.
*   This allows you to identify which specific variations perform best.

**6. Monitor Parameter Usage Over Time**

*   Regularly audit your UTM parameters to ensure naming consistency and relevance.
*   Remove or update obsolete parameters to prevent clutter and maintain clean analytics data.

**7. Connect Offline Campaigns**

*   Apply UTMs to printed materials, packaging, in-store promotions, or events.
*   Tracking offline engagement this way helps you connect it to online analytics and measure full campaign ROI.

**8. Document Everything**

*   Maintain a shared document of all active UTMs, naming conventions, and their purpose.
*   Makes onboarding new team members easier and ensures everyone on your team follows the same structure.

Third-Party Analytics & Marketing Platforms

Any analytics tool that reads URL parameters can use UTMs. The main benefit is consistent attribution across multiple platforms, not just Google Analytics. UTMs are a universal language for tracking campaigns.

Most modern analytics platforms can read UTM parameters if they are passed in the URL:

*   **Adobe Analytics.**Can capture URL parameters, including UTMs, for campaign tracking, though custom setup in report suites may be required.
*   **HubSpot.**Automatically recognizes UTMs and maps them to campaigns without additional configuration.
*   **Marketo.**Tracks UTMs for lead and campaign attribution automatically once configured.
*   **Salesforce Marketing Cloud.**Reads UTM parameters from links to attribute campaigns effectively.
*   **Mixpanel.**Supports tracking of UTMs via custom URL parameters, which typically need to be defined as custom properties or events.
*   **Amplitude.**Can track UTMs for campaign and traffic source attribution, usually requiring setup as custom properties or events.
*   **Segment.**Ingests UTM parameters from URLs and forwards them to downstream analytics tools, often needing definition as custom properties or events.

Social Media and Advertising Tools

These platforms don’t generate UTMs automatically, but if you append UTMs to your URLs, their analytics can track traffic via Google Analytics or other tools:

*   **Facebook Ads Manager.**Does not natively create UTMs but recognizes them when added to links, making it useful for GA tracking.
*   **LinkedIn Ads, Twitter Ads, TikTok Ads.**Similarly, UTMs can be appended to links for campaign tracking.
*   **Mailchimp, ActiveCampaign, SendGrid, Klaviyo (Email Marketing Tools).** Often includes built-in options to add UTM parameters to links automatically.

Summary

Campaign parameters—also known as UTM tags—are added to URLs to track where visitors come from and how they interact with your content. When paired with analytics tools like Google Analytics, they provide clear insight into campaign performance, audience behavior, optimization opportunities, and conversion attribution.

When combined with QR codes, UTMs also make it possible to measure offline activity and engagement in physical environments. Delivr’s UTM Builder simplifies this process by helping you add core parameters (source, medium, campaign name) along with optional fields such as content, term, and campaign ID.

Best practices include testing your links, using consistent naming conventions, leveraging dynamic parameters, shortening URLs, and maintaining a documented UTM structure. These steps ensure accurate tracking, cleaner reporting, and smarter marketing decisions across every channel.

