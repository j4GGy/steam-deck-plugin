import logging

logging.basicConfig(filename="/tmp/template.log",
                    format='[Template] %(asctime)s %(levelname)s %(message)s',
                    filemode='w+',
                    force=True)
logger=logging.getLogger()
logger.setLevel(logging.INFO) # can be changed to logging.DEBUG for debugging issues

class Plugin:
    state: int = 0

    # A normal method. It can be called from JavaScript using call_plugin_function("method_1", argument1, argument2)
    async def add(self, value):
        logger.info("add " + str(value) + ", state " + str(Plugin.state))
        newState = value + Plugin.state
        Plugin.state = newState
        return newState

    async def getState(self):
        logger.info("getState " + str(Plugin.state))
        return Plugin.state

    async def setState(self, value): 
        logger.info("setState " + str(value))
        Plugin.state = value
        return value

    # Asyncio-compatible long-running code, executed in a task when the plugin is loaded
    async def _main(self):
        logger.info("Hello World!")
        pass
