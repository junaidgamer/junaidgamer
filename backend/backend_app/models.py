from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class MyUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        """
        Creates and saves a user with the given username, email, and password.
        """
        if not email:
            raise ValueError('Users must have an email address')
        if not username:
            raise ValueError('Users must have a username')

        user = self.model(
            username=username,
            email=self.normalize_email(email),
            **extra_fields
        )

        if password:
            user.set_password(password)

        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        """
        Creates and saves a superuser with the given username, email, and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(username, email, password, **extra_fields)

class MyUser(AbstractBaseUser):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = MyUserManager()

    def __str__(self):
        return self.username



class Tweet(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(MyUser, related_name='tweets', on_delete=models.CASCADE)

class Comment(models.Model):
    content = models.CharField(max_length=200)
    parent_comment = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='replies')

    def __str__(self):
        return self.content

