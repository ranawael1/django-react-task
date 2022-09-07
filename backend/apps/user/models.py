from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class customUserManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        if not email:
            raise ValueError('You must have an email"')
        user = User.objects.filter(email=email).first()
        if user:
            print("okkkkkkk")
            raise ValueError('Email already exists!')
                    
                
        user = User()
        user = self.model(
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.username = username
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        if not email:
            raise ValueError('You must have an email"')
        user = User.objects.filter(email=email).first()
        if user:
            ValueError('Email already exists!')
        user = User()
        user = self.model(
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.is_admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    username = models.CharField(max_length=255, unique=False, blank=True)
    email = models.EmailField(unique=True, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = customUserManager()

    def __str__(self):
        return self.email

    #Custom model:

    # has permission? yes
    def has_perm(self, perm, obj=None):
        return True
    # has permission to view app? yes
    def has_module_perms(self, app_label):
        return True
       
    # for superuser 
    @property
    def is_staff(self):
        return self.is_admin
    
    
    
   