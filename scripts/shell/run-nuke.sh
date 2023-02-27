#!/bin/bash

# Run a pipeline of commands that includes `tee` to write the output to a file and the console

echo "Hello, World!" | tee output.txt | wc -c

# Set the exit status of the script based on the exit status of the first command in the pipeline
export EXIT_STATUS=${PIPESTATUS[0]}
echo "exit status : " $EXIT_STATUS
if [ ${EXIT_STATUS} -eq 0 ]; then
    echo "Pipeline succeeded"
else
    echo "Pipeline failed with exit status ${EXIT_STATUS}"
fi
