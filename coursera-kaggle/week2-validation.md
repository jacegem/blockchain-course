## Submission stage

We can observe that:

- LB score is consistently hight/lower that validation score
- LB score is not correlated with validation score at all

0. We may already have quite  different scores in Kfold
1. too little data in public leaderboard
2. train and test data are from different distributions

![](https://i.imgur.com/CzaK4vO.png)



Causes of validation problems:

- too little data in public leaderboard
- incorrect train/test split
- different distributions in train and test

### Expect LB shuffle because of

- Randomness
- Little amount of data
- Different public/private distributions

### Conclusion

- If we have big dispersion of scores on validation stage, we should do  extensive validation

  - Average scores from different KFold splits
  - Tune model on one split, evaluate score on the other

- If submission's score do not match local validation score, we should
  - Check if we have too little data in public LB
  - Check if we overfitted
  - Check if we chose correct splitting strategy
  - Check if train/test have different distributions

- Expect LB shuffle because of
  - Randomness
  - Little amount of data
  - Different public/private distributions



 ### Summary of Validation topic

1. Defined validation and its connection to overfitting
2. Described common validation strategies
3. Demonstrated major data splitting strategies
4. Analysed and learn how to tackle main validation problems



---

# Validation

1. Suppose we are given a huge dataset. We did a KFold validation once and noticed that scores on each fold are roughly the same. Which validation type is most practical to use?



