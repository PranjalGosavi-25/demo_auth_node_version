export class CustomerIoUtils {
  static trackEvent(payload: { eventName: string; data: any }) {
    if (window.analytics) {
      window.analytics.track(payload.eventName, payload.data);
    }
  }

  static identifyUser(payload: { user: any }) {
    const { user } = payload;
    if (window.analytics) {
      window.analytics.identify(user?.userId, {
        userId: user?.userId,
        name: user?.name,
        email: user?.emailId
      });
    }
  }
}
