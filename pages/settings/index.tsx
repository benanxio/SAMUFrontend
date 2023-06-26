import Layout from "@/src/apps/Layouts/Layout";
import SettingsLayout from "@/src/apps/Layouts/SettingsLayout";
import useUser from "@/src/apps/Reports/hooks/useUser";
const Settings = () => {
  const { user } = useUser();
  return (
    <Layout screenLoader={false}>
      <SettingsLayout title="Informacion de usuario">
        <div className="surface-section">
          <ul className="list-none p-0 m-0">
            <li className="flex align-items-center py-3 px-2 surface-border flex-wrap">
              <div className=" w-6 md:w-3 font-medium">
                Nombres y Apellidos{" "}
              </div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                {user.first_name}
                {user.last_name}
              </div>
            </li>
            <li className="flex align-items-center py-3 px-2 surface-border flex-wrap">
              <div className=" w-6 md:w-3 font-medium">Email</div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                {user.email}
              </div>
            </li>
          </ul>
        </div>
      </SettingsLayout>
    </Layout>
  );
};

export default Settings;
