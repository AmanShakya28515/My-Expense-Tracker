from .models import Expense
from rest_framework import serializers
from .models import Expense

class ModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'


