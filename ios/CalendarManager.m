//
//  CalendarManager.m
//  spm1
//
//  Created by Snehal Machan on 3/13/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "CalendarManager.h"
#import <React/RCTLog.h>

@implementation CalendarManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location date:(NSDate *)date)
{
  RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
  RCTLogInfo(@"the date is %@", date);
}
RCT_EXPORT_METHOD(findEvents:(RCTResponseSenderBlock)callback)
{
  NSArray *events = @[@"This",@"is",@"good"];
  callback(@[[NSNull null], events]);
}
RCT_EXPORT_METHOD(addName:(NSString *)name addAge:(NSString *)age callback:(RCTResponseSenderBlock)callback)
{
  NSArray *events = @[name,age];
  callback(@[[NSNull null], events]);
}
@end

