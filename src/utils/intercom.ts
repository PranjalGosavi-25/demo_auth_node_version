declare global {
  interface Window {
    Intercom: any;
    intercomSettings: any;
    analytics?: any;
  }
}

export class IntercomHelper {
  static initIntercom(payload: { user: any; company: any }) {
    if (process.env.NEXT_PUBLIC_APP_MODE === 'production') {
      const { user, company } = payload;
      window.intercomSettings = {
        api_base: 'https://api-iam.intercom.io',
        app_id: 'ite49jss',
        name: user.name, // Full name
        email: user.emailId, // Email address
        user_id: user.userId, // User ID
        created_at: user.createdAt, // Signup date as a Unix timestamp
        user_hash: user.intercomHash, // Intercom hash
        company: {
          id: company?._id || '', // Company ID
          name: company?.name || '', // Company name
          created_at: company?.createdAt || '', // Signup date as a Unix timestamp
          is_demo: company?.isDemo || false, // Demo company
          modules: company?.modules?.join(',') || '', // Modules
          subscription_plan: company?.subscriptionPlan || 'Basic', // Subscription plan
          tags: company?.metaData?.tags?.join(',') || '', // Tags,
          is_sandbox: company?.metaData?.isSandbox || false // Trial company
        }
      };

      // We pre-filled your app ID in the widget URL: 'https://widget.intercom.io/widget/ite49jss'
      (function () {
        var w: any = window;
        var ic = w.Intercom;
        if (typeof ic === 'function') {
          ic('reattach_activator');
          ic('update', w.intercomSettings);
        } else {
          var d = document;
          var i: any = function () {
            i.c(arguments);
          };
          i.q = [];
          i.c = function (args: any) {
            i.q.push(args);
          };
          w.Intercom = i;
          var l = function () {
            var s = d.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = 'https://widget.intercom.io/widget/ite49jss';
            var x = d.getElementsByTagName('script')[0];
            if (x.parentNode) {
              x.parentNode.insertBefore(s, x);
            }
          };
          if (document.readyState === 'complete') {
            l();
          } else if (w.attachEvent) {
            w.attachEvent('onload', l);
          } else {
            w.addEventListener('load', l, false);
          }
        }
      })();
    }
  }
}
