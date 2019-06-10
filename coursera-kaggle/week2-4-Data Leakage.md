# Data leakage

## Basic data leaks

### A moment to reflect

- How bad it is?
- Whats the public opinion?
- To exploit or not to exploit

### Contents

- Leakage types and examples
- Competition specific. Leaderboard probing
- Concrete walkthroughts

### Leaks in time series

- Split should be done on time
  - In real life we don't have information from future
  - In competition first thing to look: train/public/private split, is it on time?
- Even when split by time, features may contain information about future.
  - User history in CTR tasks
  - Weather

### Unexpected information

- Meta ata
- Information in IDs
- Row order

## Leaderboard probing and examples of rare data leaks

### Leaderboard probing

- Types of LB probing
- Categories tightly connected with 'id' are valuables to LB probing
  - Company of user in RedHat Competition
  - Year, Month, Week in WestNile competition

### Truly Native

- Predict  whether the content  in an HTML file is sponsored or not
- Data leak in archive dates. But is it all?
  - Data collection
  - Data proxies



## Expedia Kaggle challenge

### Data leakage

- destination_distance - user_city pair is a leak to true hotel location. A lot of matches between train and test.
- How to improve on that?
- Features based on counts on corteges of such nature
- Try to find the true corrdinates

![](https://i.imgur.com/1AqSU7J.png)



![](https://i.imgur.com/XV7LiRV.png)

### Final model

- Out-of-fold feature generation. 2013 ↔ 2014
- Xgboost
- 16 hours of training







