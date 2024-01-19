# https://youtu.be/ZbX4Ok9YX94?t=6277
Unhandled Runtime Error

Error: Hydration failed because the initial UI does not match what was rendered on the server.

Warning: Expected server HTML to contain a matching <div> in <body>.

See more info here: https://nextjs.org/docs/messages/react-hydration-error


# https://youtu.be/ZbX4Ok9YX94?t=14395
Type '{ inviteCode: string; }' is not assignable to type 'ServerWhereUniqueInput'.
  Type '{ inviteCode: string; }' is not assignable to type '{ id: string; } & { id?: string | undefined; AND?: ServerWhereInput | ServerWhereInput[] | undefined; OR?: ServerWhereInput[] | undefined; ... 9 more ...; channels?: ChannelListRelationFilter | undefined; }'.
    Property 'id' is missing in type '{ inviteCode: string; }' but required in type '{ id: string; }'.ts(2322)
index.d.ts(3112, 5): The expected type comes from property 'where' which is declared here on type '{ select?: ServerSelect<DefaultArgs> | null | undefined; include?: ServerInclude<DefaultArgs> | null | undefined; data: (Without<...> & ServerUncheckedUpdateInput) | (Without<...> & ServerUpdateInput); where:

# https://youtu.be/ZbX4Ok9YX94?t=25989
Problema ao clicar no botão o edit modal de um canal(channel) não acessa ao em vez disso ele redireciona para o /servers/... usando
"const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { channel, server });
}"

# https://youtu.be/ZbX4Ok9YX94?t=38369
Import trace for requested module:
./node_modules/ws/lib/buffer-util.js
./node_modules/ws/lib/receiver.js
./node_modules/ws/wrapper.mjs
./node_modules/engine.io-client/build/esm-debug/transports/websocket-constructor.js
./node_modules/engine.io-client/build/esm-debug/index.js
./node_modules/socket.io-client/build/esm-debug/url.js
./node_modules/socket.io-client/build/esm-debug/index.js
./components/providers/socket-provider.tsx

./node_modules/ws/lib/validation.js
Module not found: Can't resolve 'utf-8-validate' in 'C:\Users\victo\OneDrive\Área de Trabalho\site_nextjs_services_in_production-main\node_modules\ws\lib'

Import trace for requested module:
./node_modules/ws/lib/validation.js
./node_modules/ws/lib/receiver.js
./node_modules/ws/wrapper.mjs
./node_modules/engine.io-client/build/esm-debug/transports/websocket-constructor.js
./node_modules/engine.io-client/build/esm-debug/index.js
./node_modules/socket.io-client/build/esm-debug/url.js
./node_modules/socket.io-client/build/esm-debug/index.js
./components/providers/socket-provider.tsx
 ⚠ ./node_modules/ws/lib/buffer-util.js
Module not found: Can't resolve 'bufferutil' in 'C:\Users\victo\OneDrive\Área de Trabalho\site_nextjs_services_in_production-main\node_modules\ws\lib'

# [SOLUÇÃO] 
# webpack: (config) => {
#        config.externals.push({
#            "utf-8-validate": "commonjs utf-8-validate",
#            bufferutil: "commonjs bufferutil",
#        });
#
#        return config;
#    },
Failed to load resource: net::ERR_CONNECTION_RESET
api/socket/io?EIO=4&transport=polling&t=OqVuBVE&sid=ipji49zp255tHX30AAAr:1