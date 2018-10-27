#!/usr/bin/env bash
npm run b
NODE_ENV=production node deploy/tools/archive
scp  dist.zip root@www.newkouzi.com:/root/html
ssh root@www.newkouzi.com  << EOF
    cd /root/html;
    unzip -o -d zx dist.zip;
    exit;
EOF
