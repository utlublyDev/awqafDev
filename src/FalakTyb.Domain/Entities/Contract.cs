using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace awqaf.Domain
{
    [Table("contract")]
    public class Contract : BaseEntity<long>
    {
        public string ContractDescription { get; set; }
        public string ContactNumber { get; set; }
        public string Email { get; set; }
        public bool? Status { get; set; }
        [Required]
        public DateTime? ContractStartDate { get; set; }
        [Required]
        public DateTime? ContractEndDate { get; set; }
        public DateTime? CreationDate { get; set; }
        public long ProvidersId { get; set; }
        public Providers Providers { get; set; }
        public string contarctFileUrl { get; set; }

      

        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj == null || GetType() != obj.GetType()) return false;
            var contract = obj as Contract;
            if (contract?.Id == null || contract?.Id == 0 || Id == 0) return false;
            return EqualityComparer<long>.Default.Equals(Id, contract.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public override string ToString()
        {
            return "Contract{" +
                    $"ID='{Id}'" +
                    $", ContractDescription='{ContractDescription}'" +
                    $", ContactNumber='{ContactNumber}'" +
                    $", Email='{Email}'" +
                    $", Status='{Status}'" +
                    $", ContractStartDate='{ContractStartDate}'" +
                    $", ContractEndDate='{ContractEndDate}'" +
                    $", CreationDate='{CreationDate}'" +
                    "}";
        }
    }
}
