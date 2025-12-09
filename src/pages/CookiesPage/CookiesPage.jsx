import { useEffect } from 'react';

const CookiesPage = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cdn.iubenda.com/iubenda.js";
        script.async = true;
        document.body.appendChild(script);

        // This is the inline script logic. It seems iubenda.js handles the loader logic itself.
        // The original inline script was a loader for another script.
        // The original script was:
        // (function (w,d) {
        //     var loader = function () {
        //         var s = d.createElement("script"), tag = d.getElementsByTagName("script")[0];
        //         s.src="https://cdn.iubenda.com/iubenda.js";
        //         tag.parentNode.insertBefore(s,tag);
        //     };
        //     if(w.addEventListener) {
        //         w.addEventListener("load", loader, false);
        //     } else if(w.attachEvent) {
        //         w.attachEvent("onload", loader);
        //     } else {
        //         w.onload = loader;
        //     }
        // })(window, document);
        // This whole thing is just a cross-browser way to load `https://cdn.iubenda.com/iubenda.js` on window load.
        // We can achieve the same with `useEffect`.

        // The iubenda documentation probably suggests this snippet.
        // Let's see how to integrate iubenda with React.
        // A quick search for "iubenda react" shows that people often use `react-helmet` or `useEffect`.
        // The `useEffect` approach is the modern standard way without extra dependencies.

        // The iubenda script seems to look for an anchor tag with specific classes to embed the policy.
        // So, the script should be loaded when the component mounts.
        // `useEffect` is perfect for this.

        // It's also good practice to clean up the script when the component unmounts.
        return () => {
            document.body.removeChild(script);
        }
    }, []); // Empty dependency array means this effect runs once when the component mounts.

    return (
        <div>
            <h1>Cookies Page</h1>
            <a 
                href="https://www.iubenda.com/privacy-policy/64804965/cookie-policy" 
                className="iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe" 
                title="Cookie Policy "
            >
                Cookie Policy
            </a>
        </div>
    );
}

export default CookiesPage;
