---
# Jekyll Front Matter
layout: martini
title: "A Visual Journey Through Erasmus+ Mobility (2014-2022)"
---

# A Visual Journey Through Erasmus+ Mobility Programme (2014-2022)

Have you ever wondered how interconnected Europe truly is? The **Eramus+ programme** is one-factor in this interconnected this, as it works primarily to facilitate cross-border collaboration between countries. 
Each year, it makes it possible for hundreds of thousands of students and staff to study, train, or volunteer abroad thereby leading the way for shared experiences, cultural understanding, and strengthened academic bonds [1].

Let us start by delving into the the history of this intiative using **official Erasmus+ mobility data from 2014 to 2022** to explore the journeys taken and the connections created [2].

## The Big Picture: People In Motion

**First, how has the number of Erasmus+ participants changed year by year?**

<!-- Display the static PNG using the known working structure -->
<img src="{{ site.baseurl }}/assets/yearly_participants_bar.png"
     alt="Bar chart showing total Erasmus+ participants per year from 2014 to 2022"
     style="max-width: 880px; width: 100%; display: block; margin: 1em auto;"
     >

**Figure 1**: *Total Erasmus+ Participants (2014-2022). Source: Erasmus+ Open Data.*

Over the last 10 years we see that more and more people are participating in the programme with 2020 and 2021 noticing a very large drop in the number of participants caused by the COVID-19 pandemic that forced people into lockdown. 
There is another factor that is largely unnoticably, but is worth mentioning, the brexit in the UK also went into effect in 2020 but is largely unnoticably due to the overshadowering nature of the pandemic [3]
Even with the pandemic the programme saw a visible recovery beginning in 2022 which underlines the value participants place on international experiences.

---

### Who are the Key Countries in this Exchange?

While overall numbers tell part of the story, some countries consistently play a more central role, both in sending their citizens abroad and in welcoming others. Which nations form the core of this vast network?

<!-- Using the static Top Countries Bar Charts -->
<figure style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/top_countries_bar_charts.png"
       alt="Bar charts showing Top 10 sending and receiving countries for Erasmus+ (2015-2022)"
       style="max-width: 900px; width: 100%;">
  <figcaption style="margin-top: 8px; font-size: 0.9em; color: #555;">Fig 2: Top 10 Sending & Receiving Countries (Total 2015-2022). Source: Erasmus+ Open Data.</figcaption>
</figure>

Figure 2 highlights the powerhouses of Erasmus+ mobility. Nations like Spain, France, Germany, and Italy consistently feature as both top senders and receivers, acting as pivotal hubs within this European exchange network. This initial overview sets the stage, but where exactly are these participants moving, and how have these hotspots evolved?

---
## Visualizing the Flow: Geographic Hotspots & Emerging Patterns 
Having seen the overall trends, let us explore the scene more in depth. The following interactive heatmaps paint a picture of where Erasmus+ participants were primarily **coming from (sending)** and **going to (receiving)** across the continent, year by year.

**You can use the time slider at the bottom of each map to watch how these concentrations shift from 2014 to 2022.** So now, I inquire you, do certain regions consistently glow hotter? Do new hotspots emerge over time or is it consistent across the years?

<div class="interactive-viz-container" style="margin: 20px auto; padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;">
    <h4 style="text-align:center; margin-bottom:10px;">Sending Hotspots (2014-2022)</h4>
    <iframe src="{{ site.baseurl }}/assets/folium_maps/erasmus_heatmap_with_time_SENDING_ONLY.html" width="100%" height="600px" frameborder="0" style="border:1px solid #ccc;" title="Animated Heatmap of Erasmus+ Sending Locations"></iframe>
    <figcaption style="text-align:center; margin-top:5px; font-size:0.9em;">Fig 3: Animated heatmap of Erasmus+ sending locations.</figcaption>
</div>

<div class="interactive-viz-container" style="margin: 20px auto; padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; margin-top:30px;">
    <h4 style="text-align:center; margin-bottom:10px;">Receiving Hotspots (2014-2022)</h4>
    <iframe src="{{ site.baseurl }}/assets/folium_maps/receiving_heatmap_with_time_RECEIVING_ONLY.html" width="100%" height="600px" frameborder="0" style="border:1px solid #ccc;" title="Animated Heatmap of Erasmus+ Receiving Locations"></iframe>
    <figcaption style="text-align:center; margin-top:5px; font-size:0.9em;">Fig 4: Animated heatmap of Erasmus+ receiving locations.</figcaption>
</div>

These heatmaps offer a broad sense of geographic concentration. But what about the specific partnerships between individual countries? Who are Germany's top sending partners? Where do students arriving in Italy primarily come from? To answer these questions, it is now time for you to explore the data yourself!

---

## Your Turn to Explore: Dive into Country-Specific Details 

 The interactive map below allows you to investigate the mobility flow of each nation within the Erasmus+ programme. Some things might surprise you as it did for me. 

**How to use this map:**
1.  Choose a country you're interested in.
2.  **Click on its capital city's marker.**
3.  A pop-up will appear along witha summary of that country's overall Erasmus+ participation (total numbers from 2014-2022), including:
    *   Total participants sent.
    *   Total participants received.
    *   Gender distribution of its outgoing participants.
    *   Its **top 5 sending destinations** (where its participants go).
    *   Its **top 5 origin countries** (where its incoming participants come from).

Now its up to you do uncover things! Are there surprising partnerships? How does your country of interest compare to its neighbors? 

<div class="interactive-viz-container" style="margin: 20px auto; padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; margin-top:30px;">
    <h4 style="text-align:center; margin-bottom:10px;">Interactive Country Details Map (Overall 2014-2022)</h4>
    <iframe src="{{ site.baseurl }}/assets/folium_maps/interactive_capitals_flow_details.html" width="100%" height="750px" frameborder="0" style="border:1px solid #ccc;" title="Interactive Country Flow Details Map with Capital Markers"></iframe>
    <figcaption style="text-align:center; margin-top:5px; font-size:0.9em;">Fig 5: Click on a capital's marker to see detailed Erasmus+ flow statistics for that country (2015-2022 totals).</figcaption>
</div>

---

## For the curious reader

If this has not satisfied your craving and you want to explore more, then I emplore you to take a visit at the official erasmus+ website where they have more extensive data visualization: https://erasmus-plus.ec.europa.eu/resources-and-tools/factsheets-statistics-evaluations/statistics/data/learning-mobility-projects

---

## Sources

* [1] **What is Erasmus?**: https://erasmus-plus.ec.europa.eu/da/about-erasmus/what-is-erasmus
* [2] **The Erasmus+ Mobility data from 2014 to 2022**: https://erasmus-plus.ec.europa.eu/resources-and-tools/factsheets-statistics-evaluations/statistics/for-researchers
* [3] **How will Britain’s exit from the Erasmus scheme affect students?**: https://www.axa-schengen.com/en/news/brexit-erasmus-students