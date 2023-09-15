import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="scroll-smooth">
        <Head>
          <link rel="shortcut icon" href="/static/favicons/favicon-16x16.png" type="image/x-icon" sizes="16x16" />
          <link rel="shortcut icon" href="/static/favicons/favicon-32x32.png" type="image/x-icon" sizes="32x32" />
          <link rel="apple-touch-icon" sizes="144x144" href="/static/favicons/apple-touch-icon-144x144.png"/>
          <link rel="apple-touch-icon" sizes="114x114" href="/static/favicons/apple-touch-icon-114x114.png"/>
          <link rel="apple-touch-icon" sizes="72x72" href="/static/favicons/apple-touch-icon-72x72.png"/> 
          <link rel="apple-touch-icon" sizes="57x57" href="/static/favicons/apple-touch-icon-57x57.png"/>
          <link rel="apple-touch-icon" sizes="180x180" href="/static/favicons/apple-touch-icon-180x180.png"/>
          <link rel="apple-touch-icon" sizes="152x152" href="/static/favicons/apple-touch-icon-152x152.png"/>
          <link rel="apple-touch-icon" sizes="120x120" href="/static/favicons/apple-touch-icon-120x120.png"/>
          <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon-76x76.png"/>
          <link rel="apple-touch-icon" sizes="60x60" href="/static/favicons/apple-touch-icon-60x60.png"/>
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="theme-color" content="#000000" />
          <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Libre+Franklin:ital,wght@0,100;0,400;1,200&family=Source+Code+Pro:wght@300;400;600&display=swap" rel="stylesheet"></link>
        </Head>
        <body className="bg-fixed bg-contain bg-no-repeat bg-hero-pattern-light text-black antialiased dark:bg-hero-pattern dark:text-white ">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
