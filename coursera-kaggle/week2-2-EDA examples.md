# EDA examples

## Numerai competition EDA

### Problem statement

- Perfectly balanced binary classification
- Anonymized 21 features
- Data changes every week

#### Data leakage

- Allegedly time series
- Target variable depends on changes between each point (think of returns)
- Approximate reconstruction of true order via nearest neighbourhood analysis
- Top 10 via logistic regression on 21 original features +21features from nearest neighbour

### Hardcore EDA

Distribution of distances to the first 3 neighbors in previous weeks data

![](https://content.screencast.com/users/beneapp/folders/Snagit/media/0f00c059-2707-4191-ad99-3f75203db7ca/2019-06-09_17-16-34.png)





