<?php

namespace Lubana\PagePerformance\Helper;
class Data extends \Magento\Framework\App\Helper\AbstractHelper
{    
    const XML_PATH_IS_ENABLED = 'lubana_pageperformance/general/isEnable';
    const XML_PATH_IP = 'lubana_pageperformance/general/ip';
   public function __construct(\Magento\Framework\App\Helper\Context $context)
    {
        parent::__construct($context);
    }
    public function isActive()
    {
        $isActive= $this->scopeConfig->getValue(self::XML_PATH_IS_ENABLED, \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
        $allowedIP=($this->getIpAddress()==$this->scopeConfig->getValue(self::XML_PATH_IP, \Magento\Store\Model\ScopeInterface::SCOPE_STORE)); 
        if($isActive && $allowedIP){
            return true;
        }else{
            return false;
        }
    }
    protected function getIpAddress()
    {
        $om = \Magento\Framework\App\ObjectManager::getInstance();
        $obj = $om->get('Magento\Framework\HTTP\PhpEnvironment\RemoteAddress');
        $ip =  $obj->getRemoteAddress();
        return $ip;
    }
}