from django.shortcuts import render
from .models import Expense
from .serializers import ModelSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status



@api_view(['GET','POST'])
def EData(request):
    if request.method == 'GET':
        Expdata = Expense.objects.all()
        serializers = ModelSerializer(Expdata, many=True)
        return Response(serializers.data)
    elif request.method == 'POST':
        serializers = ModelSerializer(data= request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data)
        return Response(serializers.errors)
    

@api_view(['GET', 'PUT', 'DELETE'])
def EArkoData(request, pk):
    try:
        data = Expense.objects.get(pk=pk)
    except Expense.DoesNotExist:
        return Response({"error": "Expense not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = ModelSerializer(data)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = ModelSerializer(data, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        data.delete()
        return Response(status=status.HTTP_204_NO_CONTENT) 
    

        
    from django.shortcuts import render

def expense_ui(request):
    return render(request, 'index.html')



    



