from setuptools import setup, find_namespace_packages

setup(
    name='fii-info-extractor',
    packages=find_namespace_packages(),
    version='1.0.0',
    install_requires=[
        'flask~=1.1.1',
        'bs4~=0.0.1',
        'requests~=2.22.0',
        'flask-cors~=3.0.8',
    ],
)
