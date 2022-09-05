import email
from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status

User = get_user_model()

def get_tokens_for_user(user):
  refresh = RefreshToken.for_user(user)
  return {
      'refresh': str(refresh),
      'access': str(refresh.access_token),
  }

class Home(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        username=request.user.username
        content = {'message': 'Hello from home :)', 'username': username}
        return Response(content)

class UserLoginView(APIView):
  def post(self, request, format=None):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid(): 
        email = request.data.get('email')
        password = request.data.get('password')
        user = User.objects.filter(email=email).first()
        if user:
            if user.check_password(password):
                token = get_tokens_for_user(user)
                print(user.username)
                return Response({'token':token, 'user': user.username}, status=status.HTTP_200_OK)
    return Response({'error': 'Email or password is not valid!'}, status=status.HTTP_404_NOT_FOUND)

class UserRegisterView(APIView):
  def post(self, request, format=None):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid(): 
        email = request.data.get('email')
        username = request.data.get('username')
        password = request.data.get('password')
        password2 = request.data.get('password2')
        if password != password2:
            return Response({'error': 'Please make sure your passwords match!'}, status=status.HTTP_404_NOT_FOUND)
        try:
            user = User.objects.create_user(username=username,email=email,password=password)
            token = get_tokens_for_user(user)
            return Response({'token':token, 'user': user.username}, status=status.HTTP_200_OK)
        except ValueError as error:
            return Response({'error': str(error)}, status=status.HTTP_404_NOT_FOUND)
    return Response({'error': 'Email already exists!'}, status=status.HTTP_404_NOT_FOUND)