import os
import tensorflow as tf

# File directory
PATH = os.path.dirname(os.path.abspath(__file__))

# Build the path: ../model/best_model.keras
model_path = os.path.join(PATH, "..", "model", "best_model.keras")
model_path = os.path.abspath(model_path)
print("Loading model from:", model_path)

# Load and inspect elements
model = tf.keras.models.load_model(model_path)
print("model.input_shape:", model.input_shape)
for inp in model.inputs:
    print("input tensor shape:", inp.shape)
model.summary()