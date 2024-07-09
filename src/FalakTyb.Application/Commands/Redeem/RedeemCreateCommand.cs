
using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class RedeemCreateCommand : IRequest<Redeem>
    {
        public Redeem Redeem { get; set; }
    }
}
