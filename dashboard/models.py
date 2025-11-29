from django.db import models

class FarmInput(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    temperature = models.FloatField()
    moisture = models.FloatField()
    soil_ph = models.FloatField()
    pest_level = models.FloatField()
    recommendation = models.TextField()

    def __str__(self):
        return f"{self.timestamp} → {self.recommendation}"