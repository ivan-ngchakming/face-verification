"""InsightFace: A Face Analysis Toolkit."""
from __future__ import absolute_import
import os

try:
    import onnxruntime
except ImportError:
    raise ImportError(
        "Unable to import dependency onnxruntime. "
    )

__version__ = '0.4'

from .app import FaceAnalysis

base_dir = os.path.dirname(os.path.realpath(__file__))

face_app = FaceAnalysis(root=base_dir, allowed_modules=['detection', 'recognition'])
