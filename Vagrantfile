cluster = [
  { host: "smart01", ip: "10.10.23.11", box: "bento/ubuntu-16.04", mem: 1024, cpus: 2, gui: false },
  { host: "smart02", ip: "10.10.23.12", box: "bento/ubuntu-16.04", mem: 1024, cpus: 2, gui: false },
  { host: "smart03", ip: "10.10.23.13", box: "bento/ubuntu-16.04", mem: 1024, cpus: 2, gui: false },
]

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|

  # Use vagrant-hostmanager for host file management on both host & guest machines
  config.hostmanager.enabled = true
  config.hostmanager.manage_host = true
  config.hostmanager.manage_guest = false
  config.hostmanager.ignore_private_ip = false
  config.hostmanager.include_offline = true

  config.vbguest.auto_update = true
  # config.vbguest.no_remote = true

  # The default options is true, as the consequence:
  # 1. private key is generated per machine basis @ .vagrant/machines/#{machine_name}/private_key
  # 2. the corresponding public key is install to the machine @ /home/vagrant/.ssh/authorized_keys

  # If we set the this option to false, the default insecure private key will be used
  # @ ~/.vagrant.d/insecure_private_key
  # the corresponding insecure public key is @ https://github.com/mitchellh/vagrant/blob/master/keys/vagrant.pub

  config.ssh.insert_key = false

  cluster.each do |node|

    config.vm.define node[:host] do |node_config|

      # The most common configuration options are documented and commented below.
      # For a complete reference, please see the online documentation at
      # https://docs.vagrantup.com.

      # Every Vagrant development environment requires a box. You can search for
      # boxes at https://atlas.hashicorp.com/search.
      node_config.vm.box = node[:box]

      node_config.vm.hostname = node[:host]
      node_config.hostmanager.aliases = node[:host]

      # Disable automatic box update checking. If you disable this, then
      # boxes will only be checked for updates when the user runs
      # `vagrant box outdated`. This is not recommended.
      # config.vm.box_check_update = false

      # Create a forwarded port mapping which allows access to a specific port
      # within the machine from a port on the host machine. In the example below,
      # accessing "localhost:8080" will access port 80 on the guest machine.
      # config.vm.network "forwarded_port", guest: 80, host: 8080

      # Create a private network, which allows host-only access to the machine
      # using a specific IP.
      node_config.vm.network "private_network", ip: node[:ip]

      # Create a public network, which generally matched to bridged network.
      # Bridged networks make the machine appear as another physical device on
      # your network.
      # config.vm.network "public_network"

      # Share an additional folder to the guest VM. The first argument is
      # the path on the host to the actual folder. The second argument is
      # the path on the guest to mount the folder. And the optional third
      # argument is a set of non-required options.
      # config.vm.synced_folder "../assets", "/vagrant/assets"

      # Provider-specific configuration so you can fine-tune various
      # backing providers for Vagrant. These expose provider-specific options.
      # Example for VirtualBox:
      #
      node_config.vm.provider "virtualbox" do |vb|
        vb.name = node[:name]
        vb.gui = node[:gui]
        vb.memory = node[:mem]
        vb.cpus = node[:cpus]
      end

      config.vm.provision "chef_zero" do |chef|
        chef.cookbooks_path = "chef-repo/cookbooks"
        chef.nodes_path = "chef-repo/nodes"
        chef.roles_path = "chef-repo/roles"
        chef.custom_config_path = "chef-repo/.chef/client.rb"
      end
    end
  end
end
