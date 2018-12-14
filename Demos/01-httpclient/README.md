# Calling Anonymous 3rd Party REST APIs

In this demo you will create a new SPFx project with a single client-side web part that uses React to display the contents from an anonymous 3rd Party API: the [NASA Image REST API](https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf).

    1. Start the local web server and test the web part in the hosted workbench:

        ```shell
        gulp serve
        ```

    1. Add the web part to the workbench:
        1. When the workbench loads in a browser, select the *plus* icon to open the toolbox:

            ![Screenshot of the add web part control](./Images/http-client-test-01.png)

        1. Select the web part from the toolbox:

            ![Screenshot of the web part in the toolbox](./Images/http-client-test-02.png)

    1. Observe when the web part renders, it shows data from the NASA Imagery REST API:

        ![Screenshot of the rendered web part](./Images/http-client-test-03.png)

1. Stop the local web server by pressing <kbd>CTRL</kbd>+<kbd>C</kbd> in the console/terminal window.
