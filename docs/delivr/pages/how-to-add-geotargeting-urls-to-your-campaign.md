---
slug: "how-to-add-geotargeting-urls-to-your-campaign"
category: "Delivr"
tags:
  - delivr
title: "How to add Geotargeting URLs to your campaign."
url: "https://delivr.com/faq/1591/how-to-add-geotargeting-urls-to-your-campaign"
source: "Documents index"
date: 2026-03-04
description: "Markdown export from documents.index.json"
author: "Delivr"
last_updated: "2026-03-04"
language: "en"
topics: []
reading_time: "1 min"
origin_doc_path: "docs/delivr/pages/how-to-add-geotargeting-urls-to-your-campaign.md"
------

# How to add Geotargeting URLs to your campaign.

URL: https://delivr.com/faq/1591/how-to-add-geotargeting-urls-to-your-campaign

Title: How to add Geotargeting URLs to your campaign.

URL Source: http://delivr.com/faq/1591/how-to-add-geotargeting-urls-to-your-campaign

Markdown Content:
**Deliver Personalized, Location-Based Experiences.**With Delivr, you can route users to different destination URLs based on their geographic region—all from a single, trackable short URL. Easily create campaigns that dynamically redirect by country, U.S. state, Canadian province, or Mexican state. Whether you're targeting global markets or tailoring content regionally, Delivr makes localization seamless and scalable.
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

What are Geotargeting URLs?

Geotargeting URLs let you direct users to different landing pages based on their physical location when they scan or click. This makes it easy to localize content, language, promotions, and experiences without creating separate QR codes or links for each region.

Steps to add Geotargeting URLs.

➀

**Open the Campaign**
---------------------

From your Dashboard, locate the campaign you wish to update.

➁

**Click "Edit Campaign"**
-------------------------

In the campaign row, click the **Edit Campaign** (pencil) icon to access the campaign settings.

➂

**Scroll to the "Geotargeting URLs" Section**
---------------------------------------------

Here, you can configure alternate destination URLs based on the user’s geolocation.

➃

**Add Geotargeting Rules**
--------------------------

*   **To route visitors by country:**

 Select a country from the dropdown, enter the country-specific URL, and click the **green plus icon** to add the rule.
*   **To route visitors by U.S. State, Canadian Province, or Mexican State:**

 Select a region, enter the region-specific URL, and click the **green plus icon**to add the rule.**When Editing Save Each Rule Individually**

➄

**When Editing a Row Save Each Rule Individually**
--------------------------------------------------

After making changes to a row, click the **blue checkmark icon** to save it. Each row must be saved individually. If you begin editing a new row without saving the previous one, any unsaved changes will be lost.

**Save Your Edits**
-------------------

When you’ve finished updating the geotargeting rules, click **SAVE** or **SAVE & CLOSE** at the top or bottom of the page.

**What can I do in the Geotargeting URLs section?**
---------------------------------------------------

This section allows you to configure alternate destination URLs for users based on their location. This lets you manage all location-specific routing from a single, centralized short URL.

**How do I route visitors by country?**
---------------------------------------

1.   In the **Country-specific URLs** section:

 Select a country from the dropdown menu. 
    *   Enter the URL you want visitors from that country to be redirected to.

 Click the **green plus icon** to add the rule.

2.   After adding or editing a rule:

 Click the **blue checkmark icon** to save that row.

**Note:** Each row must be saved individually. If you begin editing a new row without saving the previous one, any unsaved changes will be lost.

**What happens to users from locations not listed?**
----------------------------------------------------

Any users who do **not match** a defined geotargeting rule will be redirected to your campaign’s **default Destination URL**, which acts as the fallback link for all unspecified regions.

**Can I geotarget by state or province?**
-----------------------------------------

Yes. Delivr supports geolocation-based routing by:

*   U.S. States
*   Canadian Provinces
*   Mexican States

These options appear within the same **Geotargeting URLs** section. The setup process is identical to country targeting:

1.   Choose the region.
2.   Enter the custom URL.

 Click the green plus icon to add.
3.   Save the row with the blue checkmark.

**Can I edit or remove a geotargeting rule?**
---------------------------------------------

Yes. You can:

*   an existing URL by updating the field and clicking the blue checkmark.
*   a rule by clicking the trash bin icon next to the entry (if available).

**Do I need to reprint my QR code after adding geotargeting?**
--------------------------------------------------------------

No. Delivr short URLs and QR codes are dynamic. Any geotargeting logic you apply is handled server-side, so your existing printed or distributed codes will continue to work without modification.

**What are typical use cases for geotargeting URLs?**
-----------------------------------------------------

*   Serve regional promotions or country-specific landing pages.
*   Share localized event details for different regions.
*   Run segmented marketing campaigns with one short link.

**Can I bulk upload or automate****Geotargeting Rules?**
--------------------------------------------------------

Yes. For large-scale deployments, Delivr supports **bulk Geotargeting URL setup** via spreadsheet import. This is ideal for managing multiple regional URLs across a global campaign.

**Import instructions for country-specific URLs.**
--------------------------------------------------

Click **EXPORT** to download the spreadsheet, update the relevant country-specific URLs, save your changes, click **BROWSE** to select the file, and then click **UPLOAD**.

**Import Instructions for region-specific URLs, by U.S. State, Canadian Province, or Mexican State.**

Click **EXPORT** to download the spreadsheet, update the relevant Region-specific URLs, save your changes, click **BROWSE** to select the file, and then click **UPLOAD**.

**How Accurate Are Geotargeting URLs?**
---------------------------------------

The IP geolocation databases we use are highly reliable, offering **99.8% accuracy at the country level**. This ensures that, in most cases, users are directed to the correct country-specific content based on their IP address.

**Factors that affect IP Geolocation accuracy.**
------------------------------------------------

Several technical factors influence how precisely an IP address maps to a physical location:

*   **IP Type.**Accuracy can differ based on the type of IP address. For example, IPv6 addresses tend to have more consistent location mapping than IPv4, and broadband IPs are generally more stable than those assigned via cellular networks.
*   **Mobile Networks**. IPs assigned to mobile users are often dynamically assigned and routed through centralized carrier infrastructure, making them harder to pinpoint.
*   **VPNs and Proxies**. These services mask the user’s actual location by rerouting traffic through remote servers, often in other countries—drastically reducing accuracy.
*   **ISP Practices**. Internet Service Providers may assign IP addresses in broad geographic blocks and often use dynamic IPs, which can change frequently and further reduce location precision.

**Why device location may still be inaccurate.**
------------------------------------------------

Even when IP geolocation is used in combination with device-based services, accuracy isn’t always guaranteed:

*   **Device-level location services** (GPS, Wi-Fi triangulation, Bluetooth) require **user consent** and are only accessible in certain contexts—such as apps or browser sessions with location permissions enabled.
*   Users may **disable or block location sharing**, intentionally or through privacy settings, which limits the ability to gather precise data.

Additionally, **corporate Wi-Fi**, **public hotspots**, and **network routing quirks** can all contribute to inconsistent or misleading location data.

**Improve Location Accuracy**
-----------------------------

To track scans with greater precision, enable GPS location tracking (with user permission). When activated, you can capture the GPS coordinates for each scan and use them to generate more accurate location reports. **Steps to Enable the Location Prompt**

1.   **Edit Your Campaign**

 In the campaign row, click the **Edit Campaign** (pencil) icon to open the campaign settings.
2.   **Find the Location Prompt Section**

 Scroll to the **Location Prompt** section. Here, you can also configure alternate destination URLs based on the user’s detected geolocation.
3.   **Enable GPS Location Requests**

 For **Prompt users for their GPS location?**, select **Yes**.
4.   **Customize the Prompt Screen**

 When enabled, an intermediate screen will appear after scan or click, asking users to optionally share their device’s location. You can personalize this screen at the account level with your logo for a branded experience.

**Best practices for Geotargeting Campaigns.**
----------------------------------------------

To ensure a smooth user experience despite these limitations:

*   **Use IP-based targeting for country-level redirection**, which is highly reliable.
*   **Set up fallback logic** (e.g., default to a global or English-language page) for users whose location cannot be confidently determined.
*   Where possible, **leverage device-level location services** to refine targeting—especially in mobile-first campaigns or apps.

**When You Can Use the UTM Builder with Geotargeting URLs**
-----------------------------------------------------------

Use the UTM Builder when the same UTM parameters apply to all links in the campaign — including both the default Destination URL and any country-specific Geotargeting URLs. In this case, the builder will automatically append the UTM parameters to each link during redirection.

### **When You Cannot Use the UTM Builder with Geotargeting URLs**

Do not use the UTM Builder if any UTM parameters vary between links.In such cases, you must:

*   Build out the full URLs yourself (using Google's UTM Builder or another tool), and

 Enter those fully tagged URLs directly into the platform, either manually or by spreadsheet upload.

### **Important**

You cannot enter parameters in both the UTM Builder _and_ at the individual link level. Choose one approach based on your use case — either apply parameters universally using the UTM Builder, or manually tag each link as needed.

Pro Tip

**With Delivr, localized engagement is just a scan away.**

 Geotargeted URLs let you personalize your content at scale—without sacrificing simplicity or control.

Where can I get help or learn more?

If you need assistance with advanced targeting, automation, or large-scale configuration, [our support team is here to help](https://delivr.com/page/652/submit-a-support-request).

