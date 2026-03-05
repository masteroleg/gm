---
slug: "data-policy"
category: "Delivr"
tags:
  - delivr
title: "Data Policy"
url: "https://delivr.com/page/707/data-policy"
source: "Documents index"
date: 2026-03-04
description: "Markdown export from documents.index.json"
author: "Delivr"
last_updated: "2026-03-04"
language: "en"
topics: []
reading_time: "1 min"
origin_doc_path: "docs/delivr/pages/data-policy.md"
------

# Data Policy

URL: https://delivr.com/page/707/data-policy

Title: Data Policy

URL Source: http://delivr.com/page/707/data-policy

Markdown Content:
Delivr sets the standard for a privacy-first approach to data. This data policy describes how we treat the data we collect in performance of our services.
----------------------------------------------------------------------------------------------------------------------------------------------------------

*   Delivr **provides cookie-free** short URLs & QR codes
*   Delivr is **GDPR and CCPA compliant**
*   Delivr **securely transports data**to our MS Azure server(s) located in the US,**data is encrypted in motion and at rest**
*   Delivr **does not collect or store sensitive data, personal data, or Personally Identifiable Information**(PII) of your audience
*   Delivr **anonymizes traffic data / IP Address**prior to database storage
*   Delivr **does not collect**user IDs or other pseudonymous identifiers
*   Delivr **does not fingerprint**devices
*   Delivr **does not build** profiles of visitors
*   Delivr **does not attempt**to identify visitors
*   Delivr **does not accumulate patterns** of an individuals activity and geospatial information
*   Delivr **does not make use** of your data for automated decision-making
*   Delivr **does not make use** of generative AI, including Large Language Models(LLMs)
*   Delivr **does not make use** of machine learning software platforms and algorithms that train on and/or learn from your data
*   Delivr **does not make use** of third-party vendors to process your data
*   Delivr **does not run** third-party tracking services or third-party cookies on on its website or on your campaigns
*   Delivr **does not track**cross-domain
*   Delivr **does not facilitate**supercookies
*   Delivr **does not facilitate**third-party advertising cookies for re-targeting
*   Delivr **does not use** your data in advertising, social, or press releases
*   Delivr **does not sell** your data
*   Delivr**does not share** your data with any third parties with two exceptions: 
    1.   We securely send anonymized location data to Google APIs to generate the maps used in your reports.
    2.   We reserve the right to share anonymized, aggregate insights e.g., _52.7% of all QR code scans across the Delivr platform originate from iOS devices._

Delivr as a data processor.
---------------------------

In order for Delivr to produce reports, we analyze a variety of sources of data, including data from the users who access your campaign links, none of them considered personal data under GDPR - save for IP address. In this scenario, Delivr is considered the data processor on behalf of our customers, who are individual data controllers. In order to report on location, Delivr tracks and stores the IP address of visitors to your campaigns. **While an IP address can be considered personal data, we never store full IP addresses.** We anonymize IP address as soon as technically feasible by replacing the last octet of your visitor’s IP address with a ‘0’. By stripping the octet from IPs, we eliminate the collection of your campaign visitors' personal data. This occurs before any data storage; the full IP address is never written to the disk.

_Notice to EU Users: As no personal data whatsoever is stored in the case of using the default method to determine location, we believe Delivr reports are not subject to GDPR laws. If the optional method of Device GPS Location is activated by you, your reports/data may be subject to GDPR laws._ _GDPR acknowledges location data’s unique position as identifiable information by making it part of its definition of “personal data” in Article 4 (1). Under GDPR, subjects of personal data are granted extended rights, including a right to access and a right to erasure._

What information is collected?
------------------------------

**Delivr****captures and**securely transports data**the following information related to your campaigns for storage and reporting to****Delivr’s** MS Azure servers located in the US.

*   **Visit Date & Time Stamp**
*   **Location**
    *   IP Address. The default method of determining location uses IP Address. IP Address is anonymized before storage or reporting.
    *   Device GPS. An optional method of determining location requires the permission of the user. With the users explicit OPT-IN, location is determined by device GPS (if activated). In this case, Latitude & Longitude is made available with a level of accuracy. If permission is not granted, IP address is used.

*   **Device User Agent String, Type of device/OS/browser**
*   **Language that the device is set to**

Location-based services.
------------------------

To provide location-based services, Delivr collects, uses, and shares **anonymized**location data, including the approximate geographic location of devices when campaigns are accessed.

As example, with the scan of a QR code or click of a Short URL, IP-based location data is collected to determine a devices’ approximate location. Further, when activated by the campaign account owner, accepted by the device owner, and available to the device, more precise location-based services may use GPS, Bluetooth, and your IP Address, along with crowd-sourced Wi-Fi hotspot and cell tower locations, and other technologies to determine a devices’ approximate location. **This location data is collected anonymously in a form that does not personally identify.**The location data is used by Delivr to provide and improve location-based content and services.

**The default method used by Delivr to determine location is IP Address.**_IP Address is anonymized prior to database storage._

*   IP Addresses are typically accurate to the city or state/province level.
*   IP Addresses that can only be identified at the country level do not appear on the map.
*   IP Addresses for which we have no geolocation data do not appear on the map.

**What happens if the "Device GPS Location" method is activated?**

Campaigns can be configured at the campaign account owners discretion to display a prompt that requests permission to determine location through GPS. If permission is granted, location and location accuracy is determined by device GPS. Latitudes and Longitudes are approximate and based on a mix of commercially-licensed and open-source IP Lookup data. If permission is not granted, location is determined by the default location method.

**True visits.**

 Delivr attempts to report only those visits that originate from “real” people engaging your campaign. Visits generated by computer programs and bots are in many cases identified and removed from your report. In some cases, applications send additional server-based visits that cannot be removed. In other cases, where visits flow though the server of an intermediate service or application, activity will appear clustered around the location of that server.

How is this information used?
-----------------------------

**This information allows Delivr to:**

1.   Provide intelligent redirection services e.g., redirect by device OS, by country, and by device language,
2.   Generate reports with date & time stamp, geolocation, device OS and language, and
3.   Identify and remove non-human, bot and spam traffic from reports.

_It is against our Terms of Service for customers to create or use URLs that contain any type of personal information. In the case that customers wish to pass personal data through the URL in any way (such as by including it in the domain name, the URL slug or in forwarding parameters) it's the customer's responsibility to notify us as well as their own customers._

**Reports are private****& secure****by default, accessible only to the account owners running the campaign and Delivr under secure login. Account owners / users can, however,**

1.   Choose to share their annonomized reports with others.
2.   Send select data to third party analytics platform by way of URL-based campaign parameters e.g.; Google Analytics UTM Parameters.
3.   Determine how long data remains in the Delivr system. Account owners / users can choose to delete their reports & underlying data at anytime.

