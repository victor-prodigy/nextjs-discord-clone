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