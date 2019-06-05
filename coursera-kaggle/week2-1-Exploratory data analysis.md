# Exploratory data analysis

## Overview

1. Exploratory Data Analysis (EDA): what and why?
2. Things to explore
3. Exploration and visualization tools
4. (A bit of) dataset cleaning
5. Kaggle competition EDA

## Exploratory Data Analysis (EDA)

EDA allows to:

- Better understand the data
- Build an intuition about the data
- Generate hypothesizes
- Find insights

![](https://i.imgur.com/fmHUNv3.png)

### Visualizations

![](https://i.imgur.com/VPEYHFk.png)

## Conclusion

With EDA we can:

- get comfortable with the data
- find magic features

Do EDA first. Do not immediately dig into modeling.

# Building intuition about the data

## Video overview

1. Getting domain knowledge
2. Checking if the data is intuitive
3. Understanding how the data was generated

## Get domain knowledge, example

Task: Predict advertiser's cost

![](https://i.imgur.com/iNXANA5.png)

## Check if the data is intuitive

![](https://i.imgur.com/cvCK4JQ.png)

- is `336` a typo?
- Or we misinterpret the feature and age 336 is normal

## Understand how the data was generated

It is crucial to understand the generation process to set up a proper validation scheme

![](https://i.imgur.com/5QZjzkD.png)

![](https://i.imgur.com/BiTZcxh.png)

## Conclusion

- Get domain knowledge
  - It helps to deeper understand the problem
- Check if the data is intuitive
  - And agrees with domain knowledge
- Understand how the data was generated
  - As it is crucial to set up a proper validation



# Exploring anonymized data

## Video overview

1. What is anonymized data?
2. What can we do with it?

## Anonymized data

![](https://i.imgur.com/8sdLiW4.png)

![](https://i.imgur.com/yEIT6HZ.png)

- Explore individual features
  - Guess the meaning of the columns
  - Guess the types of the column
- Explore feature relations
  - Find relations between pairs
  - Find feature groups

## Exploring individual features: guessing types

Helpful functions:

```python
df.types

df.info()

x.value_counts()

x.isnull()
```

## Conclusion

Two things to do with anonymized features:

- Try to decode the features
  - Guess the true meaning of the feature
- Guess the feature types
  - Each type needs its own preprocessing

# Visualizations

## Video overview

Visualization tools to

- Explore individual features
  - Histograms
  - Plots
  - Statistics
- Explore feature relations
  - Scatter plots
  - Correlation plots
  - Plot (index vs feature statistics)
  - And more

**EDA is an art!**

And visualizations are our art tools

## Art tools

![](https://i.imgur.com/KO4w0ZI.png)

```python
plt.hist(x)
```

![](https://i.imgur.com/4Cu0UyL.png)

```python
plt.plot(x,'.')
```



![](https://i.imgur.com/QfEplJZ.png)

```python
plt.scatter(range(len(x)), x, c=y)
```

![](https://i.imgur.com/xZA7nXe.png)

```python
df.describe()
x.mean()
x.var()
```

![](https://i.imgur.com/2hcfhnB.png)

```python
x.value_counts()
x.isnull()
```

## Tools for individual features exploration

Histograms:

```python
plt.hist(x)
```

Plot (index versus value):

```python
plt.plot(x, '.')
```

Statistics:

```python
df.describe()
x.mean()
x.var()
```

Other tools:

```python
x.value_counts()
x.isnull()
```

## Exploring feature relations

![](https://i.imgur.com/R3TPFsd.png)

```python
plt.scatter(x1, x2)
```

![](https://i.imgur.com/sYMGHLx.png)

```python
plt.scatter(x1, x2)
```

## Exploring individual features: pairs

![](https://i.imgur.com/5OKpFSH.png)

```python
pd.scatter_matrix(df)
```

![](https://i.imgur.com/PqivSnt.png)

```python
df.corr()
plt.matshow(...)
```

## Exploring individual features: pairs/groups

![](https://i.imgur.com/VNJc0B8.png)

```python
df.corr()
plt.matshow(...)
```

![](https://i.imgur.com/MZosa3G.png)

```python
df.mean().plot(style='.')
```

## Exploring individual features: groups

![](https://i.imgur.com/weV1Qrg.png)

```python
df.mean().sort_values.plot(style='.')
```

## Exploring individual features

```python
plt.scatter(x1, x2)
pd.scatter_matrix(df)
df.corr(), plt.matshow(...)
df.mean().sort_values().plot(style='.')

```



## Conclusion

- Explore individual features
  - Histogram
  - Plot(index vs value)
  - Statistics
- Explore feature relations
  - Pairs
    - Scatter plot, scatter matrix
    - Corrplot
  - Groups
    - Corrplot + clustering
    - Plot (index vs feature statistics)



# Dataset cleaning and other things to check

- Dataset cleaning
  - Constant features
  - Duplicated features
- Other things to check
  - Duplicated rows
  - Check if dataset is shuffled

## Duplicated and constant features

![](https://i.imgur.com/HMTC1k8.png)



![](https://i.imgur.com/YL4DwuH.png)

```python
traintest.nunique(axis=1) == 1
```

![](https://i.imgur.com/YsALD7Y.png)

```python
traintest.T.drop_duplicates()
```

![](https://i.imgur.com/YrtBHNN.png)

```python
for f in categorical_feats:
  traintest[f] = raintest[f].factorize()
  
traintest.T.drop_duplicates()
```

## Duplicated rows

![](https://i.imgur.com/2OABKJ8.png)

- Check if same rows have same label
- Find duplicated rows, understand why they are duplicated.

## Check if dataset is shuffled

![](https://i.imgur.com/yosaxgS.png)



## Cool visualizations

![](https://i.imgur.com/pYKT14A.png)

## EDA check list

- Get domain knowledge
- Check if the data is intuitive
- Understand how the data was generated

---

- Explore individual features
- Explore pairs and groups

---

- Clean features up

---

- Check for leaks! (later in this course)













<https://www.coursera.org/learn/competitive-data-science/lecture/lvdSo/dataset-cleaning-and-other-things-to-check>























































































































































































































