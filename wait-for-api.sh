#!/bin/bash

echo "Waiting for API to be available..."
until $(wget --spider -q http://app:3000/); do
  echo "API is unavailable - sleeping"
  sleep 2
done

echo "API is up - executing tests"
exec "$@"