
# tweets/serializers.py
from rest_framework import serializers
from .models import Tweet,Comment

class TweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = '__all__'

class CommentSerilaizer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields= "__all__"


# users/serializers.py
from rest_framework import serializers
from .models import MyUser

class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ('is_staff','is_active','username','user_id', 'email','date_joined','password')
        extra_kwargs = {
            'password': {'write_only': True},  # Hide password field in response
        }

    def create(self, validated_data):
        """
        Create and return a new User instance.
        """
        password = validated_data.pop('password')
        user = MyUser.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        """
        Update and return an existing User instance.
        """
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance

    def delete(self, instance):
        """
        Delete an existing User instance.
        """
        instance.delete()

    def validate_email(self, value):
        """
        Validate the format of the email field.
        """
        # Add custom email validation logic here if needed
        return value

    def validate_password(self, value):
        """
        Validate the strength of the password field.
        """
        # Add custom password validation logic here if needed
        return value
