from django.db import models


class Students(models.Model):
    username=models.CharField(max_length=20)
    password=models.CharField(max_length=20)


    def __str__(self):
        return self.username



class Test(models.Model):
    student=models.ForeignKey(Students,on_delete=models.CASCADE)
    test=models.CharField(max_length=100)


    def __str__(self):
        return self.test