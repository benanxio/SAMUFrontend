import DropdownChangeTheme from "@/src/apps/Common/components/DropdownChangeTheme";
import Layout from "@/src/apps/Layouts/Layout";
import SettingsLayout from "@/src/apps/Layouts/SettingsLayout";

const index = () => {
  return (
    <Layout screenLoader={false}>
      <SettingsLayout title="Configurar tema">
        <div>
          <h1 className="font-bold mb-2">Cambiar Tema</h1>
          <DropdownChangeTheme />
        </div>
      </SettingsLayout>
    </Layout>
  );
};

export default index;
