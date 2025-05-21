#!/bin/sh
npm test
TEST_EXIT_CODE=$?
echo "Tests completed with exit code: $TEST_EXIT_CODE"
tail -f /dev/null