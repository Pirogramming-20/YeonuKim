from django.urls import path
from django.contrib.auth import views as auth_views
from .views import logout_page

app_name = 'common'
urlpatterns = [
    path('login/', auth_views.LoginView.as_view(template_name='common/login.html'), name='login'),
    path('logout/', logout_page, name='logout')
]