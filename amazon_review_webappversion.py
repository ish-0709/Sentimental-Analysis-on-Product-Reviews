# -*- coding: utf-8 -*-
import numpy as np
import pickle
import re
import os
import sys
import scripts
# from scripts import amazon

cv1 = pickle.load(open(os.path.join('pkl_objects', 'vectorizer.pkl'), 'rb'))
lr = pickle.load(open(os.path.join('pkl_objects', 'classifier.pkl'), 'rb'))

label = {0: 'negative', 1: 'positive'}


def reviewComment(reviewArg):

    Review_comment = [reviewArg]
    # Review_comment = ['''''']

    X = cv1.transform(Review_comment)
    # print(review)
    print('Prediction: %s\nProbability: %.2f%%' %
          (label[lr.predict(X)[0]], np.max(lr.predict_proba(X))*100))


# for link review
def productReview(url):
    pos = 0
    neg = 0
    reviewText = scripts.amazon.getReviews(url)

    for review in reviewText:
        review = [review]
        X = cv1.transform(review)
        # print(review)
        # print('Prediction: %s\nProbability: %.2f%%' %(label[lr.predict(X)[0]], np.max(lr.predict_proba(X))*100))
        if label[lr.predict(X)[0]] == 'positive':
            pos += 1

    Total = len(reviewText)
    neg = Total-pos

    if pos >= neg:
        print("Prediction: positive,Probability: %.2f%%" % (pos/Total*100))
    elif neg > pos:
        print("Prediction: negative,Probability: %.2f%%" % (neg/Total*100))


# print(sys.argv)
# [file,comment,url]
if sys.argv[1] == "":
    productReview(sys.argv[2])
else:
    reviewComment(sys.argv[1])
