---
title: Predict Urbanization using ArcGIS and Machine Learning 
date: 2025-04-19
featureImage: img/20250419_cover.png
---
I find that the best way to learn a new tool is by finishing a small, interesting project. To get comfortable with ArcGIS, I came up with a project to model and predict urbanization. I used ArcGIS to prepare the geospatial data and, later, to visualize the model's predictions.

## The Subject: China's Pearl River Delta
The Pearl River Delta is one of China's most dynamic economic regions. It's dominated by the megacity of Guangzhou, which is surrounded by several influential, non-first-tier cities. I chose these surrounding cities as my subject because they are more typical in the area.

![](img/20250419_subject.png)

There are various ways to predict urbanization. You could base it on administrative regions or a unified grid. I chose the grid approach to really dig into the spatial analysis capabilities of ArcGIS. I set the grid size to 2km x 2km for a few reasons:
1. It aligned well with the resolution of the data I could find.
2. It kept the computation time manageable.
3. It's a size large enough to represent the average conditions of an area.
4. 
![](img/20250419_grid.png)

Urbanization in the Pearl River Delta looked very different before and after 2010. Based on the data available, I decided to use data from 2010 as the **features** for my model and the population density from 2020 as the **target**.

In other words, the goal was to create a model that, given the data for a grid cell in a particular year, could predict the population density for that same grid cell 10 years later.

## Data Collection
To predict the process of urbanization, I brainstormed several key data categories:
1. **Population**: Where are people living now?
2. **Economy**: Where is the economic activity?
3. **Urban Footprint**: What areas are already built up?
4. **Geography**: What are the natural constraints on growth?

I learned a lot about searching for GIS data online and discovered several useful databases. Here's what I found:
### Population
**Source**: [LandScan Global Population Database](https://landscan.ornl.gov/)

This dataset provides global, 1km x 1km grid data for the 24-hour average population for every year from 2000 to 2023.

![](img/20250419_population.png)

### Economy
**Source**: [China GDP Spatial Distribution Kilometer Grid Data](https://www.resdc.cn/DOI/DOI.aspx?DOIID=33)

This source provides GDP data for China in a 1km x 1km grid for every five years from 1995 to 2020. The value represents the GDP in units of 10,000 CNY for each grid cell.

![](img/20250419_GDP.png)

### Urbanized and Water Areas

**Source**: [China Land Cover Dataset (CLCD)](https://zenodo.org/records/12779975)

This amazing source provides annual land use data for all of China from 1985 to 2023 on a fine 30m x 30m grid. Each grid cell is assigned a land use type. I used the "Impervious" layer to represent the urbanized area.

![](img/20250419_impervious.png)

The "Water" layer from this dataset also served as a key part of the **geographical environment** data.

![](img/20250419_water.png)

### Geographical Environment

**Source**: [USGS EarthExplorer](https://www.usgs.gov/tools/earthexplorer)

This source offers detailed elevation data for the entire world. I can use the standard deviation of elevation within each of my grid cells. This value represents how rugged or uneven the terrain is. The assumption is that the higher the value, the less likely the area is to be developed.

![](img/20250419_gratitude.png)

## Data Process

First, I created the 2km x 2km grid. Then, for each data type (population, GDP, etc.), I used the **Zonal Statistics** tool in ArcGIS to calculate the mean value within each grid cell.

Ideally, I would have created more features from this raw data. For example, I could have calculated the distance from each grid cell to the nearest town center, national highway, or provincial capital. But, for the sake of time, I kept it simple.

#### The "Ambient Population Density"
I did engineer one new feature: "ambient population density." The idea is that a grid cell surrounded by dense areas is more likely to see population growth, even if it isn't dense right now. To calculate this, I used the **Focal Statistics** tool to sum the population of a 3x3 grid neighborhood and then subtracted the value of the center cell.

![](img/20250419_ambient.png)

## Training the Model

I converted the grid data to points and exported the attribute table, keeping the **OID** as a unique identifier. The **feature** data was then normalized and combined with the **target** data into a single `.csv` file.

I split the data by city, using five cities for the training set and three cities for the evaluation set.

![](img/20250419_trainEva.png)

I chose the **Gradient Boosting Regressor** algorithm for training, as it performs very well on structured data like this. To fine-tune the model's parameters, I used **GridSearchCV**.

## Results and Reflection

The model was evaluated using the **Root Mean Squared Error (RMSE)**. The final RMSE was about 395. This means that, on average, the model's prediction for population density was off by 395 people. This error is fairly significant, especially since the majority of grid cells have a population density below 1800.

![](img/20250419_numberOfValue.png)

The model could definitely be improved by incorporating the additional data types I mentioned earlier, like the distance to infrastructure.

Finally, the predicted data was loaded back into ArcGIS for visualization, completing the circle and bringing the project to life.

![](img/20250419_result.png)






