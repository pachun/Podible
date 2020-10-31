#import <Foundation/Foundation.h>
#import <AVFoundation/AVFoundation.h>
#import "AudioInterruptions.h"
#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@implementation AudioInterruptions

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

- (instancetype)init {
  self = [super init];
  [self registerForAudioInterruptions];
  return self;
}

- (NSArray<NSString *> *)supportedEvents {
    return @[@"audioInterruptionBegan", @"audioInterruptionEnded"];
}

- (void) handleAudioInterruption: (NSNotification *)notification
{
    NSNumber *interruptionType = [[notification userInfo] objectForKey:AVAudioSessionInterruptionTypeKey];

    switch (interruptionType.unsignedIntegerValue) {
        case AVAudioSessionInterruptionTypeBegan:{
             [self sendEventWithName:@"audioInterruptionBegan" body:@{}];
        } break;
        case AVAudioSessionInterruptionTypeEnded:{
            [self sendEventWithName:@"audioInterruptionEnded" body:@{}];
        } break;
        default:
            break;
    }
}

- (void) registerForAudioInterruptions {
  [[NSNotificationCenter defaultCenter] addObserver:self
                                               selector:@selector(handleAudioInterruption:)
                                                   name:AVAudioSessionInterruptionNotification
                                                   object: nil];
}

@end
