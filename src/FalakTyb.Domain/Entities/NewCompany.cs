using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace awqaf.Domain
{
    [Table("new_company")]
    public class NewCompany : BaseEntity<long>
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string CompanyName { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string CompanyType { get; set; }
        [Required]
        public string CommercialRegistrationNo { get; set; }
        [Required]
        public string TradeLicenseNumber { get; set; }
        public string ServiceType { get; set; }
        public DateTime? CreationDate { get; set; }

       

        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj == null || GetType() != obj.GetType()) return false;
            var newCompany = obj as NewCompany;
            if (newCompany?.Id == null || newCompany?.Id == 0 || Id == 0) return false;
            return EqualityComparer<long>.Default.Equals(Id, newCompany.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public override string ToString()
        {
            return "NewCompany{" +
                    $"ID='{Id}'" +
                    $", Name='{Name}'" +
                    $", CompanyName='{CompanyName}'" +
                    $", Address='{Address}'" +
                    $", PhoneNumber='{PhoneNumber}'" +
                    $", Email='{Email}'" +
                    $", CompanyType='{CompanyType}'" +
                    $", CommercialRegistrationNo='{CommercialRegistrationNo}'" +
                    $", TradeLicenseNumber='{TradeLicenseNumber}'" +
                    $", ServiceType='{ServiceType}'" +
                    $", CreationDate='{CreationDate}'" +
                    "}";
        }
    }
}
