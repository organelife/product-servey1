-- Add RLS policies for user_roles table
create policy "Admins can manage user roles"
on public.user_roles
for all
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

create policy "Users can view their own role"
on public.user_roles
for select
to authenticated
using (user_id = auth.uid());