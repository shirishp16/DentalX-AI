import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from sklearn.utils.class_weight import compute_class_weight
import numpy as np
import os


# ---------- DATA PREPARATION ----------

# Configuration

image_size = (512, 256)
batch_size = 32

train_dir = '../data/train'
valid_dir = '../data/valid'
test_dir = '../data/test'

# Train data augmentation and normalization
train_datagen = ImageDataGenerator(
    rescale = 1./255,
    # rotation_range=20,
    # width_shift_range=0.2,
    # height_shift_range=0.2,
    # shear_range=0.2,
    # zoom_range=0.2,
    horizontal_flip = True
)

# Valid and Test data rescaling
valid_datagen = ImageDataGenerator(rescale=1./255)
test_datagen = ImageDataGenerator(rescale=1./255)

# Flow from directory for train, validation, and test
train_data = train_datagen.flow_from_directory(
    train_dir,
    target_size = image_size,
    batch_size = batch_size,
    class_mode = 'sparse'
)

valid_data = valid_datagen.flow_from_directory(
    valid_dir,
    target_size = image_size,
    batch_size = batch_size,
    class_mode = 'sparse'
)

test_data = test_datagen.flow_from_directory(
    test_dir,
    target_size = image_size,
    batch_size = batch_size,
    class_mode = 'sparse',
    shuffle = False
)

# Verify class indices
print("Class Indices: ", train_data.class_indices)


# Handle imbalanced classes
    # Extract class labels from training data 
class_weights = compute_class_weight(
    class_weight = 'balanced',
    classes = np.unique(train_data.classes),
    y = train_data.classes
)

class_weights = dict(enumerate(class_weights))

# ---------- MODEL ARCHITECTURE AND TRAINING ----------

from tensorflow.keras.layers import Conv2D, MaxPooling2D, GlobalAveragePooling2D, Input, Dense, Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau, ModelCheckpoint

inp = Input(shape=(*image_size, 3))

# 1st convolutional block
x = Conv2D(32, (3, 3), activation='relu', padding='same')(inp)
x = Conv2D(32, (3, 3), activation='relu', padding='same')(x)
x = Dropout(0.2)(x)
x = MaxPooling2D((2, 2))(x)

# 2nd convolutional block
x = Conv2D(64, (3, 3), activation='relu', padding='same')(x)
x = Dropout(0.2)(x)
x = MaxPooling2D((2, 2))(x)

# 3rd convolutional block
x = Conv2D(128, (3, 3), activation='relu', padding='same')(x)
x = Dropout(0.2)(x)
x = MaxPooling2D((2, 2))(x)


# Average Pooling for the output
x = GlobalAveragePooling2D()(x)

# Fully connected layer
x = Dense(128, activation='relu')(x)
x = Dropout(0.5)(x)

# Output layer (4 = # classes)
out = Dense(4, activation='softmax')(x)

# Model definition
model = Model(inputs=inp, outputs=out)

my_callbacks = [
    EarlyStopping(min_delta=0.0001, monitor='loss', patience=15),
    ReduceLROnPlateau(monitor='val_loss', factor=0.1, patience=15),
    ModelCheckpoint(filepath='best_model.keras', monitor='val_loss', save_best_only=True)
]

model.compile(optimizer=tf.keras.optimizers.Adam(),
              loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# ---------- MODEL SUMMARY ----------
model.summary()

# ---------- MODEL FITTING ----------
history = model.fit(
    train_data,
    epochs=100,
    validation_data=valid_data,
    class_weight=class_weights,
    callbacks=my_callbacks
)

# ---------- BEST MODEL LOADING ----------
best_model = tf.keras.models.load_model('best_model.keras')




# ---------- MODEL EVALUATION ----------

import matplotlib.pyplot as plt

# Training Epoch Evaluation

    # Plot loss and val_loss
plt.figure(figsize=(12, 6))
plt.subplot(1, 2, 1)
plt.plot(history.history['loss'], label='loss')
plt.plot(history.history['val_loss'], label='val_loss')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.legend()
plt.title('Training and Validation Loss')

    # Plot accuracy and val_accuracy
plt.subplot(1, 2, 2)
plt.plot(history.history['accuracy'], label='accuracy')
plt.plot(history.history['val_accuracy'], label='val_accuracy')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.legend()
plt.title('Training and Validation Accuracy')
plt.show()

from sklearn.metrics import classification_report, confusion_matrix, ConfusionMatrixDisplay

# Valid and Test Data Evaluation

    # Evaluate and predict using the best model
def evaluate_and_report(model, data, data_type='Validation'):
    preds = model.predict(data)
    pred_classes = np.argmax(preds, axis=1)
    true_classes = data.classes

    # Print classification report
    report = classification_report(true_classes, pred_classes, target_names=data.class_indices.keys())
    print(f'{data_type} Classification Report:\n', report)

    # Confusion matrix
    cm = confusion_matrix(true_classes, pred_classes)
    disp = ConfusionMatrixDisplay(confusion_matrix = cm, display_labels = data.class_indices.keys())
    disp.plot(cmap = plt.cm.Blues)
    plt.title(f'Confusion Matrix for {data_type} Data')
    plt.show()

    # Valid data evaluation
evaluate_and_report(model, valid_data, data_type='Validation')

    # Test data evaluation
evaluate_and_report(model, test_data, data_type='Test')

import random

# Predict classes for test data
test_preds = model.predict(test_data)
test_pred_classes = np.argmax(test_preds, axis = 1)
test_true_classes = test_data.classes


# Display 30 random test images w/ actual vs. predicted labels
fig, axes = plt.subplots(6, 5, figsize = (20, 20))
axes = axes.flatten()

for ax in axes:
    idx = random.randint(0, len(test_data.filenames) - 1)
    img = plt.imread(os.path.join(test_dir, test_data.filenames[idx]))
    ax.imshow(img)
    true_label = list(test_data.class_indices.keys())[test_true_classes[idx]]
    pred_label = list(test_data.class_indices.keys())[test_pred_classes[idx]]
    ax.set_title(f"True: {true_label}\nPred: {pred_label}")
    ax.axis('off')

plt.tight_layout()
plt.show()
