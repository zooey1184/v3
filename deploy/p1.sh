#!/usr/bin/env bash
npm run b
NODE_ENV=production node deploy/tools/archive
scp  dist.zip root@www.nizhenpi.com:/root/html
ssh root@www.nizhenpi.com  << EOF
    cd /root/html;
    unzip -o -d h5 dist.zip;
    exit;
EOF
