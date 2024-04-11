from django.shortcuts import render
from django.http import JsonResponse
import json
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ..models import CustomUser,Product,Review,Question,Answer
from ..products import products
from ..serializers import ReviewSerializer,QuestionSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def postReview(request,pk):
    user = request.user
    data =request.data
    product = Product.objects.get(id=int(pk))
    review = Review.objects.create(
        product=product,
        user=user,
        review=data['review'],
        rating=data['rating']
    )
    serializer = ReviewSerializer(review, many=False)

    return Response(serializer.data)


@api_view(['GET'])
def getReviews(request,pk):

    product = Product.objects.get(id=int(pk))
    reviews = Review.objects.filter(
        product=product,
    )
    serializer = ReviewSerializer(reviews, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def getQuestions(request,pk):

    product = Product.objects.get(id=int(pk))
    questions = Question.objects.filter(
        product=product,
    )
    serializer = QuestionSerializer(questions, many=True)

    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def postQuestion(request,pk):
    user = request.user
    data =request.data
    product = Product.objects.get(id=int(pk))
    question = Question.objects.create(
        product=product,
        user=user,
        vendor=product.vendor,
        question=data['question']
    )
    serializer = QuestionSerializer(question, many=False)

    return Response(serializer.data)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getVendorQuestions(request):
    user = request.user
    questions = Question.objects.filter(
        vendor=user
    )
    serializer = QuestionSerializer(questions, many=True)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getVendorUnansweredQuestions(request):
    user = request.user
    questions = Question.objects.filter(
        vendor=user,
        is_answered=False
    )
    serializer = QuestionSerializer(questions, many=True)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getVendorUnansweredQuestions(request):
    user = request.user
    questions = Question.objects.filter(
        vendor=user,
        is_answered=False
    )
    serializer = QuestionSerializer(questions, many=True)

    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def postQuestion(request,pk):
    user = request.user
    data =request.data
    product = Product.objects.get(id=int(pk))
    question = Question.objects.create(
        product=product,
        user=user,
        vendor=product.vendor,
        question=data['question']
    )
    serializer = QuestionSerializer(question, many=False)

    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def postAnswer(request,pk):
    user = request.user
    data =request.data
    question = Question.objects.get(id=int(pk))
    if question.vendor == user:
        setattr(question,"is_answered",True)
        question.save()
        answer = Answer.objects.create(
            question=question,
            answer=data['answer']
        )
    
        serializer = AnswerSerializer(question, many=False)

        return Response(serializer.data)
    else:
        return Response({'message':'Not allowed'},status=status.HTTP_400_BAD_REQUEST)