from django.shortcuts import render
from django.http import JsonResponse
import json
from datetime import date
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ..models import CustomUser,Product,Price,PriceTracker

from ..serializers import PriceSerializer,PriceTrackerSerializer



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPrices(request,pk):
    user = request.user

    prices = Price.objects.filter(
       product=str(pk),
    )

    serializer = PriceSerializer(prices, many=True)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTrackers(request):
    user = request.user

    trackers = PriceTracker.objects.filter(
       user=user
    )

    serializer = PriceTrackerSerializer(trackers, many=True)

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTracker(request,pk):
    user = request.user

    trackers = PriceTracker.objects.filter(
       user=user,
       product=str(pk)
    )
    if len(trackers) == 0:
        
        return Response({
        "is_tracker": False}) 

    else:
        return Response({
            "is_tracker": True
        })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def postTracker(request):
    user = request.user
    data = request.data

    product = Product.objects.get(id=data['product'])
    tracker = PriceTracker.objects.filter(
        user=user,
        product=product
    )
    if len(tracker) == 0:

        tracker = PriceTracker.objects.create(
        user=user,
        product=product,
        price=product.discounted_price,
        )

        serializer = PriceTrackerSerializer(tracker, many=False)

        return Response(serializer.data)
    
    else:

        message = {
            "message" : 'Already have been added'
        }

        return Response(message)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteTracker(request,pk):
    user = request.user
    data = request.data

    tracker = PriceTracker.objects.get(
        id=str(pk)
    )

    tracker.delete()

    return Response({"message":"successfully deleted"})



