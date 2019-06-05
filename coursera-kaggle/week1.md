# Week 1

## Feature proprocessing and generation with respect to models

### Feature generation

- Feature preprocessing is often necessary
- Feature generation is powerful technique
- Preprocessing and generation pipelines depend on a model type

## Numeric features


### Numeric

- Preprocessing
  - a) Tree-based models
  - b) Non-tree-based models
- Feature generation

### Preprocessing: scaling

1. To [0, 1]

sklearn.preprocessing.MinMaxScaler

$$
X = (X-X.min())/(X.max() - X.min())
$$

2. To mean=0, std=1

sklearn.preprocessing.StandardScaler

$$
X = (X-X.mean())/X.std()
$$

### Preprocessing: outliers

### Preprocessing: rank

- rank([-100, 0, 1e5]) == [0,1,2]
- rank([1000,1,10]) = [2,0,1]

scipy.stats.rankdata

1. Log transform: np.log(1+x)
2. Raising to the power < 1: np.sqrt(x+2/3)

### Feature generation

Ways to proceed:

- prior knowledge
- EDA

![](https://i.imgur.com/buceJ3p.png)

### Conclusion

1. Numeric feature preprocessing is different for tree and non-tree models:
  - a. Tree-based models doesn't depend on scaling
  - b. Non-tree-based models hugely depend on scaling
2. Most often used preprocessing are:
  - a. MinMaxScaler - to [0,1]
  - b. StandardScaler - to mean==0, std=1
  - c. Rank - sets spaces between sorted values to be equal
  - d. np.log(1+x) and np.sqrt(1+x)
3. Feature generation is powered by:
  - a. Prior knowledge
  - b. Exploratory data analysis

## Categorical and ordinal features

### Ordinal features

- Ticket class: 1,2,3
- Driver's license: A,B,C,D
- Education: kindergarden, school, undergradute, bachelor, master, doctoral

### Label encoding

![](https://i.imgur.com/Lo9XAoP.png)

![](https://i.imgur.com/AkVVbJE.png)

[S,C,Q] → [0.5, 0.3, 0.2]

```python
encoding = titanic.groupby('Embarked').size()
encoding = encoding/len(titanic)
titanic['enc'] = titanic.Embarked.map(encoding)

```

```python
from scipy.stats import rankdata

```

![](https://i.imgur.com/JQ2wR9q.png)



### Categorical features

![](https://i.imgur.com/jDOiGqx.png)

1. Values in ordinal features are sorted in some meaningful order
2. Label encoding maps categories to numbers
3. Frequency encoding maps categories to their frequencies
4. Label and Frequency encodings are often used for tee-based models
5. One-hot encoding is often used for non-tree-based models
6. Interactions of categorical features can help linear models and kNN



## Datetime and coordinates

![](https://i.imgur.com/CXR4sGc.png)

### Date and time

1. Periodictiy
    - Day number in week, month, season, year, second, minute, hour
2. Time since
    - Row-independent moment
    - For example: since 00:00:00 UTC, 1 January 1970;
    - Row-dependent important moment
    - Number of days left until next holidays/time passed after last holiday
3. Difference between dates
    - datetime_feature_1 - datetime_feature_2

![](https://i.imgur.com/ODAOEbs.png)

### Periodicity. <Time since>

![](https://i.imgur.com/FOE9LBN.png)

![](https://i.imgur.com/hxRqcGU.png)

![](https://i.imgur.com/9vlpBnI.png)

![](https://i.imgur.com/3UEJCNn.png)

### Coordinates

![](https://i.imgur.com/Lrj1tnn.png)

이 사각형의 다른 모든 객체에 대해서 해당 평면에 거리를 추가할 수 있음

![](https://i.imgur.com/TNN7MA3.png)

### Conclusion

1. Datetime
   1. Periodiciity
   2. Time since row-independent/dependent event
   3. Difference between dates
2. Coordinates
   1. Interesting places from train/test data or additional data
   2. Centers of clusters
   3. Aggregated statistics

## Handling missing values

### Missing data, numeric

![](https://i.imgur.com/sUCVzSr.png)



![](https://i.imgur.com/xYGYI12.png)

0과 1 사이에 균일한 분포가 있음

따라서 숫자가 없는 경우 -1로 교체되었다고 가정

누락된 값은 숨겨져 있습니다.

### Fillna approaches

1. -999, -1, etc
2. mean, median
3. Reconstruct value

![](https://i.imgur.com/VZ7NHmK.png)

![](https://i.imgur.com/7CDsdD2.png)

### Feature generation with missing values

![](https://i.imgur.com/QrjYa91.png)

![](https://i.imgur.com/d4BoTge.png)

![](https://i.imgur.com/jFQKXXo.png)



### Treating values which do not present in train data

![](https://i.imgur.com/ENN3EHG.png)

![](https://i.imgur.com/mbbIiOe.png)

1. The choice of method to fill NaN depends on the situation
2. Usual way to deal with missing values is to replace them with -999, mean or median
3. Missing values already can be replaced with something by organizers
4. Binary feature 'isnull' can be beneficial
5. In general, avoid filling nans before feature generation
6. Xgboost can handle NaN

## Feature preprocessing and generation with respect to models

2. Neural network, Nearest neighbours, Linear models



# Feature extraction from text and images

## Bag of words

![](https://i.imgur.com/X0QdnsN.png)

![](https://i.imgur.com/U4CMuNB.png)



Term frequency

```python
tf = 1 / x.sum(axis=1)[:,None]
x = x * tf
```

Inverse Document Frequency

```python
idf = np.log(x.shape[0] / (x>0).sum(0))
x = x * idf
```

sklearn.feature_extraction.text.TfidfVectorizer

### Bag of words: TF

![](https://i.imgur.com/9ZTY64q.png)

### Bag of words: TF + iDF

![](https://i.imgur.com/4VTbEcL.png)

### N-grams

![](https://i.imgur.com/Vh9BD8u.png)

sklearn.feature_extraction.text.CountVectorizer:

Ngram_range, analyzer

### Texts preprocessing

1. Lowercase
2. Lemmatization
3. Stemming
4. Stopwords

### Text preprocessing: lowercase

![](https://i.imgur.com/1VzwzUg.png)

### Texts preprocessing: lemmatization and stemming

![](https://i.imgur.com/1m1KqYO.png)

Stemming:

- democracy, democratic, and democratization → democr
- Saw → s

Lemmatization:

- democracy, democratic, democratization → democracy
- Saw → see or saw (depending on context)

### Texts preprocessing: stopwords

Examples:

1. Articles or prepositions
2. Very common words

NLTK, Natural Language Toolkit library for python

> sklearn.feature_extraction.text.CountVectorize:
>
> max_df

### Conclusion

Pipeline of applying BOW

1. Preprocessing:
   - Lowercase, stemming, lemmatization, stopwords
2. Ngrams can help to use local lcontext
3. Postprocessing: TFiDF



## Word2vec, CNN

![](https://i.imgur.com/RkoPzHj.png)

### Word2vec

![](https://i.imgur.com/0rBPZsP.png)

![](https://i.imgur.com/RzBe7H0.png)

**Words**: Word2vec, Glove, FastText, etc

**Sentences**: Doc2vec, etc

There are pretrained models

### BOW and w2v comparison

1. Bag of words
   - Very large vectors
   - Meaning of each value in vector is known
2. Word2vec
   - Relatively small vectors
   - Values in vector can be interpreted only in some cases
   - The words with similar meaning often have similar embeddings



### Finetuning example

![](https://i.imgur.com/H2QB2h8.png)



### Augmentation

![](https://i.imgur.com/EDivF3t.png)



### Feature extraction from text and images

1. Texts
   - Preprocessing
     - Lowercase, stemming, lemmarization, stopwords
   - Bag of words
     - Huge vectors
     - Ngrams can help to use local context
     - TFiDF can be of use as postprocessing
   - Word2vec
     - Relatively small vectors
     - Pretrained models
2. Images
   - Feature can be extracted from different layers
   - Careful choosing of pretrained network can help
   - Finetuning allows to refine pretrained models

## Final project overview





















































































