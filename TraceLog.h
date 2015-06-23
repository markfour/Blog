//
//  TraceLog.h
//  ATLAS1000
//
//  Created by abrain on 10/08/31.
//  Copyright 2010 株式会社エーブレイン. All rights reserved.
//

//Log Macro
#ifdef DEBUG
#   define TRACE(fmt, ...) NSLog((@"%s(%d) " fmt), __PRETTY_FUNCTION__, __LINE__, ##__VA_ARGS__);
#else
#   define TRACE(...);
#endif

//add priprocessor
//DEBUG

//color Macro
#define HEXCOLOR(c) [UIColor colorWithRed:((c>>16)&0xFF)/255.0 \
green:((c>>8)&0xFF)/255.0 \
blue:(c&0xFF)/255.0 \
alpha:1.0];

//example
//UIColor *color = HEXCOLOR(0xff00ff);