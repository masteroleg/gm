---
slug: "how-accurate-is-location-reporting"
category: "Delivr"
tags:
  - delivr
title: "Location Reporting Accuracy Explained"
url: "https://delivr.com/faq/1623/how-accurate-is-location-reporting"
source: "Documents index"
date: 2026-03-04
description: "Markdown export from documents.index.json"
author: "Delivr"
last_updated: "2026-03-04"
language: "en"
topics: []
reading_time: "1 min"
origin_doc_path: "docs/delivr/pages/how-accurate-is-location-reporting.md"
------

# Location Reporting Accuracy Explained

URL: https://delivr.com/faq/1623/how-accurate-is-location-reporting

Title: Location Reporting Accuracy Explained

URL Source: http://delivr.com/faq/1623/how-accurate-is-location-reporting

Markdown Content:
How accurate is IP-based location reporting?
--------------------------------------------

Delivr uses trusted, industry-leading IP geolocation databases to estimate where scans and visits originate. These databases are highly reliable at the country level, with accuracy of up to 99.8%.

Accuracy decreases as location granularity increases and varies by region:

*   **Country**. Very high accuracy
*   **State / Province**. Moderate accuracy, varies by country and network
*   **City**. Lower accuracy, often unreliable

Additionally, in some countries and regions, digital infrastructure is less developed or frequently shared across neighboring areas. This can further reduce the accuracy of IP-based geolocation compared to more digitally advanced regions.

These limitations are inherent to IP-based location tracking and represent an industry-wide challenge — not something specific to Delivr.

What IP-based location is (and isn’t).
--------------------------------------

IP-based location identifies the network routing location of a request — not the precise physical location of a person or device.

**Delivr**:

*   Reports location based only on available signals
*   Does not infer or guess precise locations
*   Does not attempt to fingerprint users
*   Does not track individuals across sessions or platforms

Location data is used for aggregate reporting and analytics, not for identifying or following individual users.

Why IP-based location can be inaccurate
---------------------------------------

An IP address represents a connection point on the internet, not a physical address. Several common scenarios can cause IP-based location to differ from real-world location.

VPNs, proxies, and anonymization services.
------------------------------------------

When a user accesses a link through a VPN (Virtual Private Network), proxy, TOR exit node,or anonymizing service, their traffic is routed through a remote server.

**As a result**:

*   The detected location reflects the VPN or proxy server
*   The user’s true location is intentionally masked
*   The server may be in a different city, state, or country

Corporate, institutional, and shared networks.
----------------------------------------------

Company Wi-Fi, universities, hospitals, and other large organizations often route all traffic through centralized gateways.

**This can cause scans to appear as if they originate from**:

*   A single headquarters location
*   A regional data center
*   A different country than the user’s actual location

Mobile networks vs desktop connections.
---------------------------------------

Most QR scans happen on mobile devices.

**Mobile carriers frequently**:

*   Route traffic through regional hubs
*   Rotate IP addresses
*   Share IP ranges across wide geographic areas

This makes city-level IP location less reliable on mobile than on fixed broadband connections.

Automated security scanners and link preview services.
------------------------------------------------------

Email providers, messaging platforms, and enterprise security systems often automatically follow links to check for malicious content.

**In these cases**:

*   Visits originate from the service’s infrastructure, not a human
*   IPs may appear repeatedly
*   Some services re-scan links on a scheduled basis

These automated checks can appear as scans or visits even though no user actively engaged.

How time affects IP accuracy.
-----------------------------

IP geolocation databases are continuously updated, but they are not real-time.

**Over time**:

*   IP ownership and routing change
*   Mobile carriers reassign IP ranges
*   Cloud providers move infrastructure

This means an IP that mapped accurately yesterday may resolve differently today. Delivr reflects the**best available data at the time of access**, without retroactive adjustment.

What happens when device location services are turned off?
----------------------------------------------------------

If a user has location services disabled on their device:

*   **Country-level location** may still be available, depending on the device and network
*   **State and city data will not be available**
*   Delivr automatically falls back to **IP-based geolocation**

This behavior is controlled by the operating system and device manufacturer — not by Delivr.

How Delivr handles location accuracy and fallbacks.
---------------------------------------------------

Delivr follows a clear, conservative hierarchy and never guesses when data quality is low:

1.   GPS-based location (only if explicitly enabled and approved)
2.   IP-based country-level location
3.   Unknown / not reported when signals are insufficient

When higher-accuracy data is unavailable, Delivr reports less granular results rather than inferring precision.

Decision Flow
-------------

![Image 1](https://imagedelivery.net/XK1P2PjAYi2e8FGhgua6BQ/4f1689fd-56c5-4e2f-c6ac-ccbb28920400/public)

Optional GPS-based location (higher accuracy).
----------------------------------------------

Delivr supports **GPS-based location detection**as an optional feature.

How it works
------------

When enabled and approved by the person scanning:

*   iPhone and Android devices use built-in **GPS receivers**
*   Location is calculated using **trilateration**, based on time-coded radio signals from at least four satellites
*   Devices determine precise **latitude and longitude**(and altitude when available)

Both platforms use **Assisted GPS (AGPS)**, which combines:

*   Satellite data
*   Cellular networks
*   Wi-Fi positioning
*   Bluetooth signals (when available)

This significantly improves speed and accuracy compared to satellite-only GPS.

Consent, privacy, and user control.
-----------------------------------

GPS-based location **always requires explicit opt-in**.

*   Users are clearly prompted for permission
*   If permission is granted, GPS data is used for that interaction
*   If permission is denied, Delivr immediately falls back to IP-based location
*   No location data is collected silently or without consent

What IP-based vs GPS-based location is best suited for.
-------------------------------------------------------

**IP-based location is suitable fo**r:

*   Country-level audience insights
*   Regional trend analysis
*   High-level reporting and analytics

**IP-based location is not suitable for**:

*   Store-and facility-evel attribution
*   Determining exact physical presence
*   Compliance decisions that require precise location

**GPS-based location is suitable for**:

*   Use cases requiring higher precision
*   Experiences where the user explicitly opts in
*   Scenarios where accuracy matters more than coverage

Accuracy Ladder
---------------

Most Accurate
-------------

GPS-based Location (Opt-in)
---------------------------

*   Device-level precision
*   Latitude / Longitude
*   Requires explicit user consent

IP-based Country
----------------

*   ~99.8% accuracy
*   Reliable for market-level insights

IP-based State / Province
-------------------------

*   Variable accuracy
*   Affected by networks and carriers

IP-based City
-------------

*   Often unreliable
*   Frequently misleading on mobile

Unknown / Private / Not Reported
--------------------------------

*   Used when signals are insufficient
*   No guessing or inference

Least Accurate
--------------

Data handling and compliance (legal safe)
-----------------------------------------

*   Delivr processes location data in a privacy-first, compliance-oriented manner:
*   Location data is anonymized and aggregated
*   Delivr does not store continuous GPS trails
*   No attempt is made to identify or re-identify individuals
*   Location data is used solely for analytics and experience delivery
*   Processing aligns with applicable data protection regulations, including GDPR and CCPA, depending on customer configuration

Customers remain responsible for determining whether optional GPS-based features are appropriate for their specific use case and regulatory environment.

Summary
-------

*   IP-based geolocation is highly accurate at the country level
*   Accuracy decreases at state and city levels due to network routing, VPNs, mobile carriers, and automated scanners
*   Device settings and time-based IP changes affect results
*   Delivr never infers or guesses precise location
*   GPS-based location offers higher accuracy, but only with explicit user consent
*   When signals are limited, Delivr safely falls back or reports no location at all

